const express = require("express"),
	router = express.Router();
var jwt = require("express-jwt");
var config = require("../config.json");
var posts = require("./controller");

/**
 * params: PrivacyStatus, ClaimStatus, date, image, caption, location
 * This route requires a valid token in the header.
 * If no valid token given, responds with status 401
 * on success, responds with status 200
 */
router.post("/makePost",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.makePost
);

/**
 * params: location
 * location is optional.
 * This route requires a valid token in the header.
 * If no valid token given, responds with status 401
 * on success, responds with status 200
 */
router.get("/search/:location?",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.search
);

/**
 * params: none
 * This route requires a valid token in the header.
 * If no valid token given, responds with status 401
 * on success, responds with status 200
 */
router.get("/getFeed",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.getFeed
);

module.exports = router;
