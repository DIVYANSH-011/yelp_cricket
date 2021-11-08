const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
	title: String,
	description: String,
	role: String,
	nickname: String,
	born: Date,
	batting_style: String,
	bowling_style: String,
	teams: String,
	profiles: String,
	achievement: String,
	color: Boolean,
	image: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

playerSchema.index({
	'$**': 'text'
});

module.exports = mongoose.model("player", playerSchema);


