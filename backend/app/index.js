const express = require("express"),
	app = express();
const cors = require("cors");
const config = require("./config.json");
const authRoutes = require("./auth/routes");
const jwt = require("express-jwt");
const handleError = require("./middlewares/errorHandler");
const logger = require("morgan");

// log requests to console
app.use(logger("dev", { skip: () => process.env.NODE_ENV === "test" }));

// allow requests from a frontend
app.use(cors({ origin: `http://localhost:${config.frontendPort}` }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set up routes
app.use("/auth", authRoutes);

// simple route for testing
app.get("/", (_req, res) => 
{
	res.json({ message: "I'm running!" });
});

// simple login-required route for testing
app.get("/secret",
	jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }),
	function(req, res) 
	{
		res.status(200).json({message: "You have passed the authentication!"});
	});
// sends client a simple JSON response when a request errors out
app.use(handleError);

module.exports = app;
