const mongoose = require("mongoose")
const config = require("./config")
const logger = require("morgan")
const app = require(".")

// log requests to console
app.use(logger("dev"))

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

// start the server!
var port = config.backendPort
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});