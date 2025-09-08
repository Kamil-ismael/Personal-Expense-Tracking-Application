const express = require("express")
const createUser = require("../controllers/signup.controller.js")

const signUpRoute = express.Router()

signUpRoute.post("/signup", createUser)

module.exports = signUpRoute