const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let _db = null;

module.exports.openDb = function() 
{
	return new Promise((res, rej) => 
	{
		if (_db) 
		{
			console.warn("Called initDb more than once");
			res(_db);
		}
		else
		{
			open({
				filename: "./app/data.sqlite3",
				driver: sqlite3.Database
			}).then((db) => 
			{
				_db = db;
				res(_db);
			})
				.catch(err => 
				{
					rej(err);
				});
		}
	});
};

module.exports.getDb = function() 
{
	return _db;
};