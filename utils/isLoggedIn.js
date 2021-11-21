const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}else {
		req.flash("error","Hey! You Must be login to do that :D");
		res.redirect('/login')
	}
}


module.exports = isLoggedIn;