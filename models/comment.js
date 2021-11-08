const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user:  {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	playerId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Player"
	}
	
})

module.exports = mongoose.model("comment", commentSchema);
