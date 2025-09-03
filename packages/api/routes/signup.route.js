import express from "express"
import createUser from "../controller/signup.controller"

const signUpRoute = express.Router()

signUpRoute.post("/signup", createUser)

export default signUpRoute