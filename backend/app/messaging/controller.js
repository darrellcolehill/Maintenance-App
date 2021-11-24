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
    var userToken = jwt.verify(req.body.sender, jwtSecret);
    
    //console.log(userToken);
    
    const {receiver, message} = req.body;

    if(!userToken || !message || !receiver)
    {
        return res.status(400).json({
			message: "Missing usertoken, message, or receiver"
		});
    }


    const db = getDb();

    // check if the receiver exist here and return error if they do not
    db.get(
        "SELECT username FROM users WHERE username = ?",
        receiver
    )
    .then(data => 
    {
        if(!data)
        {
            return res.status(400).json({
                message: "receiver does not exist"
            });
        }
        else
        {
             // Inserts the new message into the database.
            db.all(
                "INSERT INTO messages (sender, receiver, message, read) VALUES (?, ?, ?, ?)",
                [userToken.username, receiver, message, 0]
            )
            .catch(error => 
            {
                return next(error);
            })

            return res.status(400).json({
                message: "Successful"
            });
        }

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
    db.all("SELECT (rowid) AS id, sender, receiver, message, read FROM messages WHERE receiver = ?", userToken.username)
    .then(messages => 
    {
        //console.log(messages);
        
        return res.status(200).json({
            messages: messages
        });

    });
    // TODO: catch errors here
};
