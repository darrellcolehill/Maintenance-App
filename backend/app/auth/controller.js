const config = require("../config");
const { getDb } = require("../database");
const jwt = require("jsonwebtoken");

const jwtSecret = config.jwtSecret;

exports.login = (req, res, next) => 
{
	const { username, password } = req.body;
	if (!username || !password) 
	{
		return res.status(401).json({
			message: "Missing username or password"
		});
	}
	
	const db = getDb();
	db.get("SELECT * FROM users WHERE username = ?", username)
		.then(user => 
		{
			if (user && password === user.password) 
			{

				// get role data for specified user
				db.all("SELECT role, rating FROM roles WHERE username = ?", username)
				.then(userRoles => 
				{
					console.log(userRoles); // TODO: delete after testing
					
					const tokenPayload = {
						id: user.username,
						roles: userRoles
					};

					const options = {
						expiresIn: "24 hours"
					};
					return res.status(200).json({
						token: jwt.sign(tokenPayload, jwtSecret, options),
					});

				});

				
			}
			else 
			{
				return res.status(401).json({
					message: "Invalid username or password!"
				});
			}
		})
		.catch(error => 
		{
			return next(error);
		});
};

exports.signup = (req, res, next) => 
{
	const {username, password, email, isTenant, isLandlord, isHandyman, isHomeowner} = req.body;

	// Array that will be used to help with inserting the user choosen roles
	var roles = [{setRole: isTenant, value: "TENANT"}, {setRole: isLandlord, value: "LANDLORD"}, 
				{setRole: isHandyman, value: "HANDYMAN"}, {setRole: isHomeowner, value: "HOMEOWNER"}];

	console.log(roles);

	if (!username || !password || !email) // Ensures that required fields exist
	{
		return res.status(400).json({
			message: "Missing username or password"
		});
	}
	
	const db = getDb();
	db.get("SELECT (rowid) FROM users WHERE username = ?", username)
		.then(user => 
		{
			if (!user) // Make sure username not taken
			{
				db.run(
					"INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
					[username, password, email]
				)
					.then(() => 
					{
						// inserts user choosen roles into roles database
						for(var i = 0; i < roles.length; i++)
						{
							if(roles[i].setRole == true)
							{
								db.run(
									"INSERT INTO roles (username, role, rating) VALUES (?, ?, ?)",
									[username, roles[i].value, 0.0]
								)
								.catch(error => 
								{
									return next(error);
								})
							}
								
						}

						return res.status(200).json({
							message: "Successfully signed up!"
						});
					})
					.catch(error => 
					{
						return next(error);
					});
			}
			else 
			{
				return res.status(400).json({
					message: "Username already exists!"
				});
			}
		});
};
