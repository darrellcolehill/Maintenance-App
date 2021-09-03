const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
	content: String,
	author_id: String
})

module.exports = mongoose.model("Post", schema)
