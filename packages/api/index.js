import express from "express"
import cors from "cors"
import loginRoutes from "./routes/login.route.js"
import signUpRoute from "./routes/signup.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", loginRoutes)
app.use("/api/auth", signUpRoute)

app.listen(8080)
