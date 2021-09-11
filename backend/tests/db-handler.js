/* from https://github.com/pawap90/test-mongoose-inmemory/blob/master/tests/db-handler.js */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer = undefined;

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    if (memoryServer) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await memoryServer.stop();
    }
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    if (memoryServer) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};