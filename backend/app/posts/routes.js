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

router.get("/getLFeed",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.getLFeed
);

router.get("/getLBuildings",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.getLBuildings
);


router.get("/getLBuildingsPosts/:buildingName?",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.getLBuildingsPosts
);


router.post("/getBuildingOwner",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.getBuildingOwner
);


router.post("/changeClaimStatus",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	posts.changeClaimStatus
);


module.exports = router;
