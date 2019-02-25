
//makes sure the emails list is valid
// 1. Emails must have a comma after every one
// 2. Emails must be valid

const re = 	
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {

	//splits string on the comma character
	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		//checks to see if the email is valid or not
		//this catches all failed emails
		//if email is valid  = false
		//if email is invalid = true
		.filter(email => re.test(email) === false);

	if(invalidEmails.length){
		return `These emails are invalid: ${invalidEmails}`;
	}

	return null;

}