const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

//get superhero_info.json
app.get('/server/superhero_info.json', (req, res) => {
    console.log(`GET request for ${req.url}`);

    fs.readFile('server/superhero_info.json', 'utf8', (err, data) => {
        //if reading file encounters an error
        if (err) {
            console.error("Error reading the file: ", err);
            //set response header with code 500, content is sent in plain text
            res.writeHead(500, { 'Content-Type': 'text/plain' }); 
            res.end('Error reading the file');
            return;
        }
        //if no error rerading the file
        res.setHeader('Content-Type', 'application/json');
        //set status code to 200, send the json file data
        res.status(200).send(data);
    });
});

//get superhero_powers.json
app.get('/server/superhero_powers.json', (req, res) => {
    console.log(`GET request for ${req.url}`);

    fs.readFile('server/superhero_powers.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file: ", err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading the file');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
    });
});

//port listen message
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
