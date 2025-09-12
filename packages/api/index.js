const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const loginRoutes = require("./routes/login.route.js")
const signUpRoute = require("./routes/signup.route.js")
const expensesRoutes = require('./routes/expenses.route.js');
const categoryRoutes = require('./routes/categories.routes');
const incomeRoutes = require('./routes/incomes.routes');
const SummaryRoutes = require('./routes/summary.routes.js');
const AccountRouter = require("./routes/account.route.js")
const ReceiptRoutes = require("./routes/receipt.route.js")

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expensesRoutes)
app.use('/api/receipts', ReceiptRoutes);
app.use("/api/auth", loginRoutes)
app.use("/api/auth", signUpRoute)
app.use("/api/summary", SummaryRoutes)
app.use("/api/account", AccountRouter)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
