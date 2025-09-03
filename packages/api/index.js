import express from "express"
import cors from "cors"
import loginRoutes from "./routes/login.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", loginRoutes)

app.listen(8080)