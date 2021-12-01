const express = require('express');
const router  = express.Router();
const Player = require('../models/player');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkPlayerOwner = require('../utils/checkPlayerOwner');

// Index
router.get("/", async (req,res) => {
	console.log(req.user);
	try{
		const players = await Player.find().exec()
		res.render("players",{players});
	}catch (err) {
		console.log(err);
		res.send("you broke it... /index")
	}
})

// Create
router.post("/", isLoggedIn, async (req, res) => {
	const profiles = req.body.profiles.toLowerCase();
	const newPlayer = {
		title: req.body.title,
		description: req.body.description,
		role: req.body.role,
		nickname: req.body.nickname,
		born: req.body.born,
		batting_style: req.body.batting_style,
		bowling_style: req.body.bowling_style,
		teams: req.body.teams,
		profiles,
		achievement: req.body.achievement,
		color: !!req.body.color,
		image: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
		
	}
	try{
		const player = await Player.create(newPlayer);
		req.flash("success", "Player created!" )
		res.redirect("/players/" + player._id);
	} catch (err) {
		req.flash("error", "Error creating player")
		res.redirect("/players");
	}
})

// New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("players_new");
})

// Search
router.get("/search", async (req, res) => {
	try{
		const players = await Player.find({
			$text: {
				$search: req.query.term
			}
		});
		res.render("players", {players})
	}catch(err){
		console.log(err);
		res.send("Broken Search")
	}
})

// Profiles
router.get("/profiles/:profiles", async(req, res) => {
	const validProfiles = ["wk-batsman","all format player","t-20 specialist","odi specialist","test specialist","all-rounders","batsman","bowlers"];
	if (validProfiles.includes(req.params.profiles.toLowerCase())) {
		const players = await Player.find({profiles: req.params.profiles}).exec();
		res.render("players",{players});
	} else {
		res.send("Please enter a valid Profile")
	}

});



// Show
router.get("/:id", async (req, res) => {
	try{
		const player = await Player.findById(req.params.id).exec();
		const comments = await Comment.find({playerId: req.params.id});
		res.render("players_show", {player, comments})
	} catch (err) {
		console.log(err);
		res.send("You broke it.. /players/:id")
	}
})

// Edit
router.get("/:id/edit", checkPlayerOwner, async (req, res) => {
		const player = await Player.findById(req.params.id).exec();	
		res.render("players_edit", {player})
});

// Update
router.put("/:id", checkPlayerOwner, async (req, res) => {
	const profiles = req.body.profiles.toLowerCase();
	const playerBody = {
		title: req.body.title,
		description: req.body.description,
		role: req.body.role,
		nickname: req.body.nickname,
		born: req.body.born,
		batting_style: req.body.batting_style,
		bowling_style: req.body.bowling_style,
		teams: req.body.teams,
		profiles,
		achievement: req.body.achievement,
		color: !!req.body.color,
		image: req.body.image
	}
	try{
		const player = await Player.findByIdAndUpdate(req.params.id, playerBody, {new: true}).exec();
		req.flash("success", "\Player updated!")
		res.redirect(`/players/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error updating player")
		res.redirect("/players");
	}
})

// Delete

router.delete("/:id",  checkPlayerOwner, async (req, res) => {
	try{
		const deletedPlayer = await Player.findByIdAndDelete(req.params.id).exec();
		req.flash("success", "Player deleted!");
		res.redirect("/players");	
	} catch (err) {
		console.log(err);
		req.flash("error", "Error deleting player")
		res.redirect("back");
	}
});



module.exports = router;
