const express = require("express")
const app = express()
const router = express.Router();



router.get("/trials" ,() => {
    res.render("trials.ejs",{trials})
    
    
})