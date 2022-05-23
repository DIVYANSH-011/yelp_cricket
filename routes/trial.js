const express = require("express");
const router = express.Router();


router.get("/trial",(req,res) => {
    res.send("this is page")
})

module.exports = router;