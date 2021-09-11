const express = require("express"),
    router = express.Router()
var auth = require("./controller")

/**
 * POST /auth/login: logs a user in and assigns them a token
 * 
 * Required parameters in request body:
 *  username (string): the username for the user
 *  password (string): the password for the user
 * 
 * Responds with an error if username/password is invalid.
 */
router.post("/login", auth.login)

/**
 * POST /auth/signup: Makes a new account for a user
 * 
 * Required parameters in request body:
 *  username (string): the username for the user.
 *  password (string): the password for the user
 * 
 * Responds with an error if the username was already taken.
 */
router.post("/signup", auth.signup)

module.exports = router
