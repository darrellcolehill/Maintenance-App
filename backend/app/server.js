const config = require("./config");
const app = require(".");
const { openDb, setupCommands } = require("./database");

openDb()
	.then((db) => 
	{
		console.log("Successfully opened database connection!");
		setupCommands.forEach(async cmd => 
		{
			await db.run(cmd);
		});
		console.log("Ran commands for database setup");
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
