const { getDb } = require("../database");
const config = require("../config");
const jwt = require("jsonwebtoken");
const jwtSecret = config.jwtSecret;

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
exports.search = (req, res, next) => 
{
	const { username } = req.params;

	const db = getDb();

	let query = "SELECT * FROM users WHERE username=?", args = [username];

	db.all(query, args)
		.then(users => 
		{
			res.status(200).send({
				result: users
			});
		})
		.catch((error) => 
		{
			return next(error);
		});
};

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
exports.setOwnLocation = (req, res, next) => 
{
	const { location } = req.body;

	console.log(req.body.token);

	var username = jwt.verify(req.body.token, jwtSecret);
	username = username.username;

	const db = getDb();

	let query = `INSERT INTO owns (owner, location) VALUES (?, ?)`;
	let args = [username, location];

	db.run(query, args)
		.then(() => 
		{
			res.status(200).send({ message: "Location successfully added" });
		})
		.catch((error) => 
		{
			return next(error);
		});
};
