const { getDb } = require("../database");

exports.makePost = (req, res, next) => 
{
	const {
		PrivacyStatus,
		ClaimStatus,
		date,
		image,
		caption,
		location
	} = req.body;
	// TODO checking arguments? 
	const author = req.user.username;

	const db = getDb();
	db.run(`INSERT INTO posts (
            PrivacyStatus,
            ClaimStatus,
            date,
            image,
            author,
            caption,
            location
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
	[PrivacyStatus,
		ClaimStatus,
		date,
		image,
		author,
		caption,
		location])
		.then(() => 
		{
			res.status(200).send({
				message: "Successfully added post!"
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
exports.search = (req, res, next) => 
{
	const { location } = req.body;

	// Finding the user's role
	let userRole;
	const db = getDb();
	db.run("SELECT (role) FROM roles WHERE username=?", req.user.username)
		.then(row => 
		{
			userRole = row.role;
		});

	let query = "SELECT * FROM posts WHERE location=?", args = [location];
	
	// Restrict to public posts if user is not a handyman
	if (userRole !== "handyman") 
		query = `${query} AND PrivacyStatus='public'`;

	db.all(query, args)
		.then(rows => 
		{
			res.status(200).send(rows);
		})
		.catch ((error) => 
		{
			return next(error);
		});
};
