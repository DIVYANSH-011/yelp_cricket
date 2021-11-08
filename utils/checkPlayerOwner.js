const Player = require('../models/player');

const checkPlayerOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {  // check if the user is logged in
          // 	if logged in, check if they own the player
		const player = await Player.findById(req.params.id).exec();
		if (player.owner.id.equals(req.user._id)) {
			next();
		} else { //if not, redirect back to show page 			
			res.redirect("back");
		}
	} else{   // If not logged in, redirect to login page 		
		res.redirect('/login')
	}
}

module.exports = checkPlayerOwner;