const Comment = require('../models/comment');

const checkCommentOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {  // check if the user is logged in
          // 	if logged in, check if they own the player
		const comment = await Comment.findById(req.params.commentId).exec();
		if (comment.user.id.equals(req.user._id)) {
			next();
		} else { //if not, redirect back to show page 			
			res.redirect("back");
		}
	} else{   // If not logged in, redirect to login page 		
		res.redirect('/login')
	}
}

module.exports = checkCommentOwner;