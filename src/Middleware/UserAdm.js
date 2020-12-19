const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function Authorization(req, res, next) {
	const authToken = req.headers['authorization']

	if (authToken != undefined) {
		const bearer = authToken.split(' ');
		var token = bearer[1];
		
		try{
			var decoded = jwt.verify(token, process.env.JWT_KEY);

			if (decoded.role == 1) {
				next();
			}else{
				res.status(403).send({
					Message: "You are not allowed "
				})
			}
		}catch(error){
			res.status(400).send({
				Message: "Token invalid"
			})
		}

	}else{
		res.status(403).send({
			Message: "You are not logged in"
		})
	}
}