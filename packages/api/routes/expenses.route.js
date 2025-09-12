//api/routes/expenses.route.js

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { ExpenseController, upload } = require('../controllers/expenses.controller');

const router = express.Router();
router.use(authenticateToken)
router.get('/',ExpenseController.getAllExpenses);
router.get('/:id',ExpenseController.getExpenseById);
router.post('/',upload.single('receipt'), ExpenseController.createExpense);
router.put('/:id',upload.single('receipt'), ExpenseController.updateExpense);
router.delete('/:id',ExpenseController.deleteExpense);
module.exports = router;