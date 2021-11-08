// =================================================
// IMPORTS
// =================================================
// NPM Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//config Imports 
const config = require('./config');

// Route Imports
const playerRoutes = require('./routes/players');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/authorization');

// Model Imports
const Player = require('./models/player');
const Comment = require('./models/comment'); 
const User = require('./models/user');

// =========================================
// DEVELOPMENT
// =========================================
// Morgan
app.use(morgan('tiny'))


// DB Connection
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

// Seed the DB
// const seed = require('./utils/seed');
// seed();

// =========================
// config section
// =========================

// express config
app.set("view engine", "ejs");
app.use(express.static('public'));

// Express session config
app.use(expressSession({
	secret: "shwdgliugubkgkgewgggiewgiwgw",
	resave: false,
	saveUninitialized: false
}));



// body-parser config
app.use(bodyParser.urlencoded({extended: true}));

// method override config
app.use(methodOverride('_method'));

// Passport config
app.use(passport.initialize());
app.use(passport.session());     //allows persistent sessions 
passport.serializeUser(User.serializeUser()); //what data should be stored in session 
passport.deserializeUser(User.deserializeUser());  // get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate()));   // use the local strategy

// Current User Middleware Config
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
})




// Use Routes
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/players",playerRoutes);
app.use("/players/:id/comments", commentRoutes);

// Listen Port
app.listen(3000, () => {
	console.log("yelp_cricket is Running....")
})