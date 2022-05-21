const express = require("express")

const app = express()

router.get("/trials" ,() => {
    res.render("trials.ejs",{trials})
    
    
})