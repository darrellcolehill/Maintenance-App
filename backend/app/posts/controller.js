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
	const { location } = req.params;

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
			res.status(200).send({
				result: rows
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
exports.getFeed = (req, res, next) => 
{
	const db = getDb();

	// Getting user's own posts
	// TODO different results for landlord feed?
	db.all("SELECT * from posts WHERE author=?", req.user.username)
		.then(rows => 
		{
			res.status(200).send({
				result: rows
			});
		})
		.catch(error => 
		{
			return next(error);
		});
};

exports.getLFeed = (req, res, next) =>
{
	const db = getDb();

	// Getting landlord's feed posts
	// TODO allow users to have a location (fix this)
	db.all("SELECT * from posts WHERE location=?", req.user.username)
		.then(rows => 
		{
			res.status(200).send({
				result: rows
			});
		})
		.catch(error => 
		{
			return next(error);
		});
};
