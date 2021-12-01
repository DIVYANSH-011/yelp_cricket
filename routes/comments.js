const express = require('express');
const router  = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Player = require('../models/player');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');


//  New comment
router.get("/new",isLoggedIn, (req, res) => {
	res.render("comments_new", {playerId: req.params.id})
})


// Create Comment - Actually Updates The database
router.post("/", isLoggedIn, async (req, res) => {
	try{
		const comment = await Comment.create({
				user: {
					id: req.user._id,
					username: req.user.username
				},
				text: req.body.text,
				playerId: req.body.playerId
			});
			req.flash("success", "Comment created!");
			res.redirect(`/players/${req.body.playerId}`)
	} catch (err) {
		console.log(err);
		req.flash("error" , "Error creating comment!");
		res.redirect("/players")
	}
		
})

// Edit Comment - show the edit form
router.get("/:commentId/edit",checkCommentOwner, async (req, res)=> {
	try{
		const player  = await Player.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		res.render("comments_edit", {player, comment});
	} catch (err) {
		console.log(err);
		res.redirect("/players");
	}
		   
})
// update comment - actually update comment in the DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		req.flash("success", "Comment edited");
		res.redirect(`/players/${req.params.id}`);	
	}catch(err) {
		console.log(err);
		req.flash("error", "Error editing comment!");
		res.redirect("/players")
	}
})




// Delete Comment - delete
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		req.flash("success", "Comment deleted!");
		res.redirect(`/players/${req.params.id}`)
	}catch(err) {
		console.log(err);
		req.flash("success" , "Error deleting comment");
		res.redirect("/players")
	}
})



module.exports = router