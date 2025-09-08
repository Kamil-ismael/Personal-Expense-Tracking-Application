const express = require("express")
const logIn = require("../controllers/login.controller.js")
const {authenticateToken} = require("../middleware/auth.js")

const loginRoutes = express.Router()

loginRoutes.post("/login", logIn)
loginRoutes.get("/me",authenticateToken, (req,res)=>{
    res.json(req.user)
})

module.exports = loginRoutes