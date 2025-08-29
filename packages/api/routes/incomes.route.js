const express = require('express');
const incomeController = require('../controllers/income.controller')
const {autheticateToken} = require('../middleware/auth');

const router = express.Router();
router.use(autheticateToken);
router.get('/', incomeController.getAllIncomes);
router.get('/:id', incomeController.getIncomesById);
router.post('/', incomeController.createIncome);