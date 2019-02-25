
//takes incoming request and modify it

//next is a function that runs when middleware is complete

//checks if a user has a correct amount of credits
module.exports = (req, res, next) => {

	if(req.user.credits < 1){
		return res.status(403).send({
			error: 'insufficient credits'
		});
	}

	next();
}