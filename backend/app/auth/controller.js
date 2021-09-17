const User = require("../models/user.model");
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
	User.findOne({ username: name }, (err, user) => 
	{
		if (err) 
		{
			return next(err);
		}
		else if (!user) 
		{
			return res.status(401).json({
				message: "Invalid username or password"
			});
		}
		else 
		{
			user.comparePassword(pass, (err, isMatch) => 
			{
				if (err) 
				{
					return next(err);
				}
				else if (!isMatch) 
				{
					return res.status(401).json({
						message: "Invalid username or password"
					});
				}
				else 
				{
					// token generation
					var payload = {
						id: user._id
					};
					var options = {
						"expiresIn": "24 hours"
					};
					return res.status(200).json({
						token: jwt.sign(payload, jwtSecret, options)
					});
				}
			});
		}
	});
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
	User.findOne({ username: name }, (err, user) => 
	{
		if (err) 
		{
			return next(err);
		}
		else if (user) 
		{
			return res.status(400).json({
				message: "Username already exists"
			});
		}
		else 
		{
			var newUser = new User({
				username: req.body.username,
				password: req.body.password
			});
			newUser.save((err) => 
			{
				if (err) 
				{
					return next(err);
				}
				else 
				{
					return res.status(200).json({
						message: "Successfully signed up!"
					});
				}
			});
		}
	});
};
