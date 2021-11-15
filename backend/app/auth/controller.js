const config = require("../config");
const jwt = require("jsonwebtoken");

const jwtSecret = config.jwtSecret;

exports.login = (req, res, next) => 
{
	var name = req.body.username, pass = req.body.password;
	if (!name || !pass) 
	{
		return res.status(401).json({
			message: "Missing username or password"
		});
	}
	// TODO database stuff
};

exports.signup = (req, res, next) => 
{
	var name = req.body.username, pass = req.body.password;
	if (!name || !pass) 
	{
		return res.status(400).json({
			message: "Missing username or password"
		});
	}
	// TODO database stuff
};
