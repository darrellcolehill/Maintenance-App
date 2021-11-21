const config = require("../config");
const { getDb } = require("../database");
const jwt = require("jsonwebtoken");

const jwtSecret = config.jwtSecret;


// sends message to specified user
exports.sendMessage = (req, res, next) => 
{
	console.log("user trying to send message");

    // NOTE: may have to convert the string containing the token to a json file, since
    // Asyncstorage is storing the string as a character??
    var userToken = jwt.verify(req.body.token, jwtSecret);
    
    const {receiver, message} = req.body;

    if(!userToken || !message || !receiver)
    {
        return res.status(400).json({
			message: "Missing usertoken, message, or receiver"
		});
    }


    // Inserts the new message into the database.
    const db = getDb();
    db.all(
        "INSERT INTO messages (sender, receiver, message, read) VALUES (?, ?, ?, ?)",
        [userToken.id, receiver, message, 0]
    )
    .catch(error => 
    {
        return next(error);
    })
    

    return res.status(200).json({
        message: "Successful"
    });
};



// gets messages for specified user
exports.getMessages = (req, res, next) => 
{
	console.log("user trying to get messages");

    // NOTE: may have to convert the string containing the token to a json file, since
    // Asyncstorage is storing the string as a character??
    var userToken = jwt.verify(req.body.token, jwtSecret);


    if(!userToken)
    {
        return res.status(400).json({
			message: "Missing token"
		});
    }

    
    // Inserts the new message into the database.
    const db = getDb();
    db.all("SELECT (rowid) AS id, sender, receiver, message, read FROM messages WHERE receiver = ?", userToken.id)
    .then(messages => 
    {

        return res.status(200).json({
            messages: messages
        });

    });
    // TODO: catch errors here
};