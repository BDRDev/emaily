//inintial app setup


//gets us access to the express library
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const cookieSession = require('cookie-session');
const passport = require('passport');

//mongoose data model
require('./models/User');
require('./models/Survey');


require('./services/passport');

const keys = require('./config/keys')

mongoose.connect(keys.mongoURI);



//generates a new express application
const app = express();

//here is where we hook up middlewares
//looks at incoming requests
app.use(bodyParser.json());
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


//routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
	// Express will serve up production assets
	//main.js or main.css files

	//if some get request comes to this file and we do not know what it is
	//look into this file to try to find the file
	app.use(express.static('client/build'));

	//Express will serve up index.html file
	//if someone makes a request we dont understand, just serve the index.html file
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}


//gets an environment variable if not there, default to 5000
//this is so we dont have to change it manually for development
const PORT = process.env.PORT || 5000;

//maybe try to do this for like 'api.humanlibrary.us' ? idk though
//doing this through heroku
app.listen(PORT);