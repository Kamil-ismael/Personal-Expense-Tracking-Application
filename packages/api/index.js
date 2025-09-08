const express = require("express")
const cors = require("cors")
const loginRoutes = require("./routes/login.route.js")
const signUpRoute = require("./routes/signup.route.js")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", loginRoutes)
app.use("/api/auth", signUpRoute)

app.listen(8080)
