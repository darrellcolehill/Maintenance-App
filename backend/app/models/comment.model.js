var mongoose = require("mongoose");

const schema = mongoose.Schema({
	content: String,
	author_id: String,
	post_id: String
});

module.exports = mongoose.model("Comment", schema);