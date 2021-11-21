const express = require("express"),
	router = express.Router();
const jwt = require("express-jwt");
const config = require("../config.json");
const { getDb } = require("../database");

router.post("/makePost",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	(req, res, next) => 
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
	});

module.exports = router;
