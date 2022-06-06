const express = require('express');
const router = express.Router();



// Trials
router.get('/trials', (req, res) => {
	res.render('trials');
});

module.exports = router;
