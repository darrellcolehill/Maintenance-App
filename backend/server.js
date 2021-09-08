/* Based on template from https://github.com/bezkoder/node-express-mongodb */

const express = require("express"),
    app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./config")
const authRoutes = require("./app/routes/auth.routes")
const logger = require("morgan")
const jwt = require("express-jwt")
const handleError = require("./app/middlewares/errorHandler")

// logs requests to console
app.use(logger("dev"))

// allow requests from a frontend
app.use(cors({ origin: `http://localhost:${config.frontendPort}` }))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// set up routes
app.use("/auth", authRoutes)

// connect to MongoDB database
mongoose
    .connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit(1);
    })

// simple route for testing
app.get("/", (_req, res) => {
    res.json({ message: "I'm running!" });
})

// protected route for testing
app.get("/secret",
    jwt({ secret: config.jwtSecret, algorithms: ['HS256'] }),
    function (_req, res) {
        return res.status(200).send("Welcome!")
    }
)

// sends client a simple JSON response when a request errors out
app.use(handleError)

// start the server!
var port = config.backendPort
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
