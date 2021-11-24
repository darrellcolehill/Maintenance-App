module.exports = [
	`CREATE TABLE IF NOT EXISTS users (
		username STRING,
		password STRING,
		email STRING
	)`,

	`CREATE TABLE IF NOT EXISTS roles (
		username STRING,
		role STRING,
		rating FLOAT(5,2)
	)`,
    
	`CREATE TABLE IF NOT EXISTS messages (
		sender STRING,
		receiver STRING,
		message STRING,
        read BOOL
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


// List of queries used to create tables
/*
`CREATE TABLE IF NOT EXISTS users (
        username STRING,
        password STRING,
        email STRING
    )`

    `CREATE TABLE IF NOT EXISTS roles (
        username STRING,
        role STRING,
        rating FLOAT(5,2)
    )`

    `CREATE TABLE IF NOT EXISTS messages (
		sender STRING,
		receiver STRING,
		message STRING,
        read BOOL
	)`
*/