
const passport = require('passport');


module.exports = app => {

	// when the user gets to this path we kick them into our oauth flow
	app.get('/auth/google', 
		passport.authenticate('google', {
			//this tells google what access we want to have, asking google to give us profile info and email
			scope: ['profile', 'email']
		})
	);

	//handles the google callback
	app.get('/auth/google/callback', 
		passport.authenticate('google')
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	})

	//arrow function gets called when this route is met
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	})
}