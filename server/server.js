const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let superheroData = [];
fs.readFile('server/superhero_info.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading superhero_info.json file: ', err);
        return;
    }
    superheroData = JSON.parse(data);
});

//set up serving front-end code
app.use(express.static('client'));

//middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

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

//ugly json format only
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

//get the first n number of matching superhero IDs for a given search pattern matching a given information field
app.get('/superhero/search', (req, res) => {
    const { publisher, name, n, race, power } = req.query;

    let filteredHeroes = superheroData.filter(hero => {
        const byPublisher = (publisher && publisher !== 'All') ? hero.Publisher.toLowerCase() === publisher.toLowerCase() : true;
        const byName = name ? hero.name.toLowerCase().includes(name.toLowerCase()) : true;
        const byRace = race ? hero.Race.toLowerCase() === race.toLowerCase() : true;
        let byPower = true;

        //im keeping this case sensitive. too much work to make it not case sensitive. still works tho
        if (power) {
            const powersData = require('./superhero_powers.json');
            const heroPowers = powersData.find(data => data.hero_names === hero.name);

            byPower = heroPowers && heroPowers[power] === "True";
        }

        return byPublisher && byName && byRace && byPower;
    });

    if (filteredHeroes.length === 0) {
        res.status(404).json({ message: 'No matching superheroes found' });
    } else {
        let result = filteredHeroes;
        if (n && parseInt(n) > 0) {
            result = filteredHeroes.slice(0, parseInt(n));
        }
        res.json({ matchingSuperheroes: result });
    }
});













//port listen message
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
