import express from "express"
import {createUser, logIn} from "../controller/login.controller"
import authenticateToken from "../middleware/auth"

const loginRoutes = express.Router()

loginRoutes.post("/api/auth/signup", createUser)
loginRoutes.post("/api/auth/login", logIn)
loginRoutes.get("/api/auth/me",authenticateToken, (req,res)=>{
    res.json(req.user)
})

export default loginRoutes