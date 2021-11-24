const express = require("express"),
router = express.Router();
var rating = require("./controller");

/**
* params: 
* on success, 
*/
// Gets the current user's rating for display in their profile
router.post("/getCurrentUserRatings", rating.getCurrentUserRatings);


/**
* params: 
* on success, 
*/
// Get another user's ratings for displaying on user search
router.post("/getUserRatings", rating.getUserRatings);


/**
* params: 
* on success, 
*/
// Get another user's ratings for displaying on user search
router.post("/giveUserRatings", rating.giveUserRatings);



module.exports = router;