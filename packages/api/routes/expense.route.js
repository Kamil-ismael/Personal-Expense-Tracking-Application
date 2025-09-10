const { getExpesenses, createExpense, updateExpense, deleteExpense } = require("../controllers/expense.controller");
const app = express.Router()

app.get("/", getExpesenses)
app.post("/", createExpense)
app.put("/", updateExpense)
app.delete("/", deleteExpense)

export default app;