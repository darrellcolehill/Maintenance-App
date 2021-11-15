const config = require("./config")
const app = require(".")

// start the server!
var port = config.backendPort
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
