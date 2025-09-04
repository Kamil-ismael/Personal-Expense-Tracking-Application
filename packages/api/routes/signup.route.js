import express from "express"
import createUser from "../controller/signup.controller.js"

const signUpRoute = express.Router()

signUpRoute.post("/signup", createUser)

export default signUpRoute