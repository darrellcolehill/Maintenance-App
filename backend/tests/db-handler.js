/* from https://github.com/pawap90/test-mongoose-inmemory/blob/master/tests/db-handler.js */
const { openDb, getDb } = require("../app/db");

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => 
{
    const db = await openDb();
    await db.run("CREATE TABLE IF NOT EXISTS users (username STRING, password STRING, email STRING)")
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