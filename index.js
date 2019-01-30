//inintial app setup


//gets us access to the express library
const express = require('express');


const mongoose = require('mongoose');


const cookieSession = require('cookie-session');
const passport = require('passport');


require('./models/User');
require('./services/passport');

const keys = require('./config/keys')

mongoose.connect(keys.mongoURI);



//generates a new express application
const app = express();

app.use(
	cookieSession({
		//how long it exists
		maxAge: 30 * 34 * 60 * 60 * 1000,
		//key to encrypt cookie
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

//creates a route handler and assocciates with a unique route
//req - object representing the incoming request
//res - object representing the outgoing response
// app.get('/', (req, res) => {
// 	res.send({ hi: 'I changed this' })
// });



require('./routes/authRoutes')(app);



//gets an environment variable if not there, default to 5000
//this is so we dont have to change it manually for development
const PORT = process.env.PORT || 5000;

//maybe try to do this for like 'api.humanlibrary.us' ? idk though
//doing this through heroku
app.listen(PORT);