const { getDb } = require("../database");

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

