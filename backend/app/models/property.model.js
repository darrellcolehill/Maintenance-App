var mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	visibility: {
		type: String,
		enum: ["public", "private"],
		default: "private"
	}
});

module.exports = mongoose.model("Property", schema);