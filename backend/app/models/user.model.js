const mongoose = require("mongoose")

const schema = mongoose.Schema({
	username: {
		type: String,
		unique: false // probably should make this true later
	},
	email: String
})

module.exports = mongoose.model("User", schema)