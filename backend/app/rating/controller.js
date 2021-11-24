const config = require("../config");
const { getDb } = require("../database");
const jwt = require("jsonwebtoken");

const jwtSecret = config.jwtSecret;



// Gets the current user's rating for display in their profile
exports.getCurrentUserRatings = (req, res, next) => 
{

    // 
    const userToken = jwt.verify(req.body.token, jwtSecret);

    if(!userToken)
    {
        return res.status(400).json({
			message: "Missing usertoken"
		});
    }


    const db = getDb();


    db.all(
        "SELECT rating, role, numRatings FROM roles WHERE username = ?",
        userToken.id
    )
    .then(data => 
    {
        return res.status(200).json({
            ratings: data,
            message: "Successful"
        });
    });
};



// Get another user's ratings for displaying on user search
exports.getUserRatings = (req, res, next) => 
{
    const requestedUser = req.body.requestedUser;


    if(!requestedUser)
    {
        return res.status(400).json({
			message: "Search field empty"
		});
    }


    const db = getDb();


    db.all(
        "SELECT rating, role, numRatings FROM roles WHERE username = ?",
        requestedUser
    )
    .then(data => 
    {

        if(!data)
        {
            return res.status(200).json({
                ratings: data,
                message: "Requested user not found"
            });
        }
        else
        {
            return res.status(200).json({
                ratings: data,
                message: "Successful"
            });
        }

    });

};




exports.giveUserRatings = (req, res, next) => 
{
    const requestedUser = req.body.requestedUser;
    const rating = req.body.rating;
    const role = req.body.role;

    if(!requestedUser || !rating)
    {
        return res.status(400).json({
			message: "Missing input requested user or rating"
		});
    }

    db.get(
        "SELECT rating, role, numRatings, sumOfRatings FROM roles WHERE username = ? AND role = ?",
        [requestedUser,role]
    )
    .then(data => 
    {
        if(!data)
        {
            return res.status(200).json({
                ratings: data,
                message: "Requested user not found"
            });
        }
        else
        {
            // Calculate new rating
            let newRating = ((data.sumOfRatings + rating) / (data.numRatings + 1));

            // TODO: Update numRatings

            // TODO: Update sumOfRatings

        }

        /*
        return res.status(200).json({
            ratings: data,
            message: "Successful"
        });
        */
    });

};