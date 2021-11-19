const express = require("express"),
	router = express.Router();
var auth = require("./controller");

/**
 * params: username, password
 * on success, responds with status 200 and the authentication token
 */
router.post("/login", auth.login);

/**
 * params: username, password, email
 * on success, responds with status 200 on success
 */
router.post("/signup", auth.signup);

module.exports = router;
