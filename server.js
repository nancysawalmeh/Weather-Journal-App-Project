// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
// Note: body-parser is deprecated, so we'll use express's built-in middleware
// const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 4080;
// Spin up the server
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

// Setup Server
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send(projectData);
});
