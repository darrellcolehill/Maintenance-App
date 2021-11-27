const express = require("express"),
	router = express.Router();
var jwt = require("express-jwt");
var config = require("../config.json");
var users = require("./controller");

/**
 * params: username
 * username is optional.
 * This route requires a valid token in the header.
 * If no valid token given, responds with status 401
 * on success, responds with status 200
 */
router.get("/search/:username?",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	users.search
);

module.exports = router;
