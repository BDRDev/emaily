
//gets us access to the express library
const express = require('express');
//above is basically the same as 'import express from "express"' but in CommonJS

//generates a new express application
const app = express();

//creates a route handler and assocciates with a unique route
//req - object representing the incoming request
//res - object representing the outgoing response
app.get('/', (req, res) => {
	res.send({ hi: 'there' })
});

//gets an environment variable if not there, default to 5000
//this is so we dont have to change it manually for development
const PORT = process.env.PORT || 5000;

//maybe try to do this for like 'api.humanlibrary.us' ? idk though
//doing this through heroku
app.listen(PORT);
