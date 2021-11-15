const express = require("express"),
	router = express.Router();
var auth = require("./controller");

/**
 * TODO implementation
 */
router.post("/login", auth.login);

/**
 * TODO implementation
 */
router.post("/signup", auth.signup);

module.exports = router;
