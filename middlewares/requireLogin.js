
//takes incoming request and modify it

//next is a function that runs when middleware is complete
module.exports = (req, res, next) => {

	if(!req.user){
		return res.status(401).send({
			error: 'you must login!'
		});
	}

	next();
}