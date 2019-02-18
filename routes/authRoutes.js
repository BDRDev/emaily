
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
	app.get(
		//route
		'/auth/google/callback', 
		//middleware
		passport.authenticate('google'),
		//send them to a different route after login
		(req, res) => {
			//res stands for response, req stands for request
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	})

	//arrow function gets called when this route is met
	//this lets us know if a user is signed in or not
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	})
}