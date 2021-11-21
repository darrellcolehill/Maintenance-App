const config = require("../config");
const { getDb } = require("../database");
const jwt = require("jsonwebtoken");

const jwtSecret = config.jwtSecret;

exports.login = (req, res, next) => 
{
	const { username, password } = req.body;
	if (!username || !password) 
	{
		return res.status(401).json({
			message: "Missing username or password"
		});
	}
	
	const db = getDb();
	db.get("SELECT * FROM users WHERE username = ?", username)
		.then(user => 
		{
			if (user && password === user.password) 
			{
				const payload = {
					id: user.id
				};
				const options = {
					expiresIn: "24 hours"
				};
				return res.status(200).json({
					token: jwt.sign(payload, jwtSecret, options)
				});
			}
			else 
			{
				return res.status(401).json({
					message: "Invalid username or password!"
				});
			}
		})
		.catch(error => 
		{
			return next(error);
		});
};

exports.signup = (req, res, next) => 
{
	const { username, password, email } = req.body;
	if (!username || !password || !email) 
	{
		return res.status(400).json({
			message: "Missing username or password"
		});
	}
	
	const db = getDb();
	db.get("SELECT (rowid) FROM users WHERE username = ?", username)
		.then(user => 
		{
			if (!user) 
			{
				db.run(
					"INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
					[username, password, email]
				)
					.then(() => 
					{
						return res.status(200).json({
							message: "Successfully signed up!"
						});
					})
					.catch(error => 
					{
						return next(error);
					});
			}
			else 
			{
				return res.status(400).json({
					message: "Username already exists!"
				});
			}
		});
};
