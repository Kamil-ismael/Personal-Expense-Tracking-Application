const express = require('express');
const incomeController = require('../controllers/income.controller')
const {autheticateToken} = require('../middleware/auth');

const router = express.Router();
router.use(autheticateToken);
router.get('/', incomeController.getAllIncomes);
router.get('/:id', incomeController.getIncomesById);
router.post('/', incomeController.createIncome);
router.put('/:id',incomeController.updateIncome);
router.delete('/:id',incomeController.deleteIncome);

module.exports = router;