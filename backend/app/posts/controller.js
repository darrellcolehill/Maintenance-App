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
			res.status(200).send();
		})
		.catch((error) => 
		{
			return next(error);
		});
};
