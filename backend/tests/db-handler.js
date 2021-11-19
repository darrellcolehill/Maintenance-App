/* from https://github.com/pawap90/test-mongoose-inmemory/blob/master/tests/db-handler.js */
const { openDb, getDb, setupCommands } = require("../app/database");

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => 
{
    const db = await openDb();
    setupCommands.forEach(async cmd => {
        await db.run(cmd);
    });
};

/**
 * Clear the database.
 */
module.exports.closeDatabase = async () => 
{
	await getDb().run("DELETE FROM users");
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => 
{
};