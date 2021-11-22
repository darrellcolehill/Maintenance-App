const express = require("express"),
router = express.Router();
var messaging = require("./controller");

/**
* params: 
* on success, 
*/
router.post("/sendMessage", messaging.sendMessage);


/**
* params: 
* on success, 
*/
router.post("/getMessages", messaging.getMessages);


module.exports = router;
