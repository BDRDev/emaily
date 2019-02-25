//Mailer instead of mailer because it exports a class

//requires in sendgrid module
const sendgrid = require('sendgrid');
//property from sendgrid object
const helper = sendgrid.mail;
//our api key
const keys = require('../config/keys');


//setup mailer class -> kind of like react component
class Mailer extends helper.Mail {

	constructor({ subject, recipients }, content){
		//es2015 class stuff
		super();

		//sendgrid setup stuff

		this.sgApi = sendgrid(keys.sendGridKey);
		//sets up from_email prop
		this.from_email = new helper.Email('no-reply@email.com');
		//sets up subject prop
		this.subject = subject;
		//sets up the body prop
		this.body = new helper.Content('text/html', content);
		//list of recipients -> needs a helper function
		this.recipients = this.formatAddresses(recipients);

		//make sure the that body is added to the content of the mailer
		//above is not enough -> addContent comes from the Mailer class
		this.addContent(this.body);

		//enables click tracking in our email
		//this is a helper that we define
		this.addClickTracking();
		//helper function
		//takes the list of recipients and add them to the mailer
		this.addRecipients();

	}

	//returns an array of formatted email addresses
	formatAddresses(recipients){
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	//this is how we add tracking to our emails
	addClickTracking(){
		//This is all from sendgrid -> this is just how it works
		//if I look at this later do not be confused -> this is just how it works
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	//this is some more sendgrid stuff -> just how it is done
	addRecipients(){
		const personalize = new helper.Personalization();

		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});

		this.addPersonalization(personalize);
	}

	//used to send the mailer to sendgrid
	async send(){
		//sendgrid api reques
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;