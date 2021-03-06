const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');



// Sign UP - NEW
router.get('/signup', (req, res) => {
	res.render('signup');
});

// Sign Up - CREATE
router.post('/signup', async (req, res) => {
	try{
		const newUser = await User.register(new User({
			username: req.body.username,
			email: req.body.email
		}),req.body.password);
		req.flash("success",`signed you as ${newUser.username}`);
		passport.authenticate('local')(req, res, () => {
			res.redirect('/players');
		});
	} catch(err) {
		console.log(err);
		res.send(err);
	}
});


// Login - Show Form
router.get("/login", (req, res) => {
	res.render('login');
});

// Login
router.post('/login', passport.authenticate('local', {
	successRedirect:'/players',
	failureRedirect:'/login',
	failureFlash: true,
	successFlash: "Logged in Successfully!"
	
}));
// Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash("success" , "Logged You Out!")
	res.redirect('/players');
});

module.exports = router;