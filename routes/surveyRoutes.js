//handles every survey route

//requires in mongoose
const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
//url is default in node.js -> helpers for parsing urls
const { URL } = require('url');


//middleware that checks to be sure that user is logged in
const requireLogin = require('../middlewares/requireLogin');
//middleware to check to see if the user has enough credits
const requireCredits = require('../middlewares/requireCredits');

//survey mongoose model
const Survey = mongoose.model('surveys');
//imports the Mailer object used for sending emails through sendgrid
const Mailer = require('../services/Mailer');

//survey template helper
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

		//requireLogins checks if a user is logged in
		//requireCredits checks to be sure if a user has enough credits

		//req is incoming request
		const { title, subject, body, recipients } = req.body;

		//create the survey
		const survey = new Survey({
			title,
			subject,
			//The text to show inside the survey
			body,
			//takes the csv list of email, splits them into an array, then returns an object of { email : email }
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			//dont need to worry about yes and no props because they are defaulted to 0
			_user: req.user.id,
			dateSent: Date.now()
		});

		//after the survey is created we want to send the emails

		//new mailer object -> 
		//pass our survey object to the new mailer object as first argument
		//pass the template function as the second argument -> this returns the html for the body of the email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			//send the email
			await mailer.send();

			//now we save the survey to the database
			await survey.save();

			//deduct a credit then save the user
			req.user.credits -= 1;

			//save the new user
			const user = await req.user.save();

			//send back the updated user model
			res.send(user);
		} catch(err) {

			res.status(422).send(err);
		}

	});

	app.post('/api/surveys/webhooks', (req, res) => {
		//this is an array of events from sendgrid
		//req.body

		//remove duplicate clicks -> events with the same email
		//we only want click events as well
		//we only want emails from a certain url

		//path parser library
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			.map(({ url, email }) => {

				//extract the path from the url -> just the route not the domain
				const pathname = new URL(url).pathname;

				//returns an object with the surveyId and survey choice
				const match = p.test(pathname);

				if(match){
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})

			//gets rid of undefined elements in the array
			.compact()

			//gets rid of non-unique items
			.uniqBy( 'email', 'surveyId')

			//runs the query
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne({
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				}, {
					//this is the update critera object

					//increments the choice option by 1
					$inc: { [choice]: 1 },
					//$ lines up with the elemMatch and updates the reponded to true
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				}).exec();  //exec is short for execute, this sends the query to the db
			})

			//gets the returned array
			.value();



		res.send({});
	})

	//gets a list of all of the surveys made by a specific user
	app.get('/api/surveys', requireLogin, async (req, res) => {

		//finds all surveys that match the critera
		const surveys = await Survey.find({
			_user: req.user.id

		}).select({
			recipients: false
		});

		res.send(surveys);

	})

};