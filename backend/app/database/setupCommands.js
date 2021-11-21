module.exports = [
	`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username STRING,
        password STRING,
        email STRING
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