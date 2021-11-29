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

	const db = getDb();
	db.all("SELECT role FROM roles WHERE username=?", req.user.username)
		.then(rows => 
		{
			let isHandyman = false;
			for (let row of rows) 
			{
				if (row.role === "HANDYMAN") 
				{
					isHandyman = true;
				}
			}
			return isHandyman;
		})
		.then(isHandyman => 
		{
			let query = "SELECT * FROM posts WHERE location=?", args = [location];
			if (!isHandyman)
				query = `${query} AND PrivacyStatus='public'`;
			return db.all(query, args);
		})
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


// gets a list of all the buildings the landlord owns
exports.getLBuildings = (req, res, next) =>
{
	let failed = false;
	const db = getDb();

	console.log(req.user.username);

	// Get all the locations that the landlord owns
	db.all("SELECT * FROM owns WHERE owner = ?", req.user.username)
	.then(data => {
		console.log(data);
		res.status(200).send({
			result: data
		});

	})
	.catch(error => {
		next(error);
	});
};


// Gets all the post for a specific building that a landlord owns
exports.getLBuildingsPosts = (req, res, next) =>
{
	const db = getDb();
	const { buildingName } = req.params;

	db.all(
		`SELECT * FROM posts
		WHERE location = ?`,
		buildingName
	)
		.then(rows => 
		{
			console.log(rows);
			res.status(200).send({
				result: rows
			});
		})
		.catch(error => 
		{
			console.log(error);
			return next(error);
		});
};



exports.getLFeed = (req, res, next) =>
{
	let failed = false;
	const db = getDb();

	db.get("SELECT * from users WHERE id=?", req.user.id)
		.then(row => 
		{
			return row.location;
		})
		.then(location => 
		{
			if (!location) 
			{
				failed = true;
				res.status(401).send({
					message: "NEED_LOCATION"
				});
			}
			else 
			{
				return db.all("SELECT * from posts WHERE location=?",
					[location]);
			}
		})
		.then(rows => 
		{
			if (!failed)
				res.status(200).send({
					result: rows
				});
		})
		.catch(error => 
		{
			next(error);
		});
};


exports.getBuildingOwner = (req, res, next) => 
{
	const db = getDb();
	//console.log(req.body.location);

	db.get("SELECT owner from owns WHERE location=?", req.body.location)
	.then(row => 
	{
		if(!row)
		{
			res.status(200).send({
				message: "owner does not exist"
			});
		}
		else
		{
			res.status(200).send({
				message: "Success",
				owner: row.owner
			});
		}
	})
	.catch(error => 
	{
		next(error);
	});

}


exports.changeClaimStatus = (req, res, next) => {
	const db = getDb();

	db.run("UPDATE posts SET ClaimStatus = 1 WHERE id = ?", req.body.postID)
	.then(row => 
	{
		if(!row)
		{
			res.status(200).send({
				message: "error changing claim status for post"
			});
		}
		else
		{
			res.status(200).send({
				message: "Success",
			});
		}
	});
}