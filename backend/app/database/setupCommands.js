module.exports = [
	`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        email TEXT
    )`,
	`CREATE TABLE IF NOT EXISTS posts (
        PrivacyStatus INTEGER,
        ClaimStatus INTEGER,
        date TEXT,
        image BLOB,
        author TEXT,
        caption TEXT,
        location TEXT
    )`
];