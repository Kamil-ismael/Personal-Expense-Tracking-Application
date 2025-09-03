import express from "express"
import logIn from "../controller/login.controller.js"
import authenticateToken from "../middleware/auth.js"

const loginRoutes = express.Router()

loginRoutes.post("/login", logIn)
loginRoutes.get("/me",authenticateToken, (req,res)=>{
    res.json(req.user)
})

export default loginRoutes