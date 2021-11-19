const config = require("./config");
const app = require(".");
const { openDb } = require("./db");

openDb()
	.then((db) => 
	{
		console.log("Successfully opened database connection!");
		db.run("CREATE TABLE IF NOT EXISTS users (username STRING, password STRING, email STRING)")
			.then(() => 
			{
				console.log("Created users table if it wasn't there before");
			});
	})
	.catch(error => 
	{
		console.error("Error connecting to database", error);
	});

// start the server!
var port = config.backendPort;
app.listen(port, () => 
{
	console.log(`Server is running on http://localhost:${port}`);
});
