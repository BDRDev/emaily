
const keys = require('../config/keys');
const stripe = require('stripe')(
	//secret key
	keys.stripeSecretKey
);

//middleware
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

	//request, result

	//handles stripe api, middleware is second argument
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//when u make post requests to request servers,
		//they do not parse the payloads,
		//we need to install a middleware to handle it
		//use body-parser - assigned to req.body object
		//console.log(req.body);

		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		console.log(charge);

		//get a reference to the user model, from passport
		//adds 5 credits
		req.user.credits += 5;

		//send model to the database, save the returned user
		const user = await req.user.save();

		//return the user back to the browser
		res.send(user);
	});

}