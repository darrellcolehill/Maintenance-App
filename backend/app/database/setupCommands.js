module.exports = [
	`CREATE TABLE IF NOT EXISTS users (
		username STRING,
		password STRING,
		email STRING
	)`,

	`CREATE TABLE IF NOT EXISTS roles (
		username STRING,
		role STRING,
		rating FLOAT(5,2),
		numRatings INT DEFAULT 0,
		sumOfRatings INT DEFAULT 0
	)`,
    
    `CREATE TABLE IF NOT EXISTS messages (
		sender STRING,
		receiver STRING,
		message STRING,
        read BOOL
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