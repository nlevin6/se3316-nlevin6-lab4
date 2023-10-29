const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const router = express.Router();

//set up serving front-end code
app.use(express.static('client'));

//middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});
//USAGE EXAMPLE: http://localhost:3000/superhero/a-bomb. will display info about A-Bomb
app.get('/superhero/', (req, res) => {
    const superheroName = req.query.name; //extract the hero name

    fs.readFile('server/superhero_info.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading superhero_info.json file: ', err);
            res.status(500).json({ error: 'Error reading superhero_info.json file' });
            return;
        }
        try {
            const allHeroes = JSON.parse(data);

            //find the superhero by name
            const superhero = allHeroes.find(hero => hero.name.toLowerCase() === superheroName.toLowerCase());

            if (superhero) {
                res.json(superhero); //send superhero information as JSON response
            } else {
                res.status(404).json({ message: 'Superhero not found' });
            }
        } catch (error) {
            console.error('Error parsing superhero_info.json:', error);
            res.status(500).json({ error: 'Error parsing superhero_info.json' });
        }
    });
});

//USAGE EXAMPLE: http://localhost:3000/superhero/0/powers. Will give powers for hero with id 0
app.get('/superhero/:id/powers', (req, res) => {
    const superheroID = req.params.id;

    fs.readFile('server/superhero_info.json', 'utf8', (err, infoData) => {
        if (err) {
            console.error('Error reading superhero_info.json file: ', err);
            res.status(500).json({ error: 'Error reading superhero_info.json file' });
            return;
        }
        fs.readFile('server/superhero_powers.json', 'utf8', (err, powersData) => {
            if (err) {
                console.error('Error reading superhero_powers.json file: ', err);
                res.status(500).json({ error: 'Error reading superhero_powers.json file' });
                return;
            }

            try {
                const heroInfo = JSON.parse(infoData);
                const heroPowers = JSON.parse(powersData);

                // Find superhero's name based on the ID
                const superhero = heroInfo.find(hero => hero.id === parseInt(superheroID));

                if (superhero) {
                    // Find powers based on the superhero name
                    const superheroPowers = heroPowers.find(hero => hero.hero_names === superhero.name);

                    if (superheroPowers) {
                        res.json(superheroPowers); // Send superhero powers as a JSON response
                    } else {
                        res.status(404).json({ message: 'Superhero powers not found' });
                    }
                } else {
                    res.status(404).json({ message: 'Superhero not found' });
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Error parsing JSON' });
            }
        });
    });
});

//get publishers
app.get('/publishers', (req, res) => {
    fs.readFile('server/superhero_info.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading superhero_info.json file: ', err);
            res.status(500).json({ error: 'Error reading superhero_info.json file' });
            return;
        }
        try {
            const heroes = JSON.parse(data);
            const publisherNames = [...new Set(heroes.map(hero => hero.Publisher))];

            res.json({ publishers: publisherNames });
        } catch (error) {
            console.error('Error parsing superhero_info.json:', error);
            res.status(500).json({ error: 'Error parsing superhero_info.json' });
        }
    });
});

//port listen message
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
