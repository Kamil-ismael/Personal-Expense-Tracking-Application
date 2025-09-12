const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { ReceiptController } = require('../controllers/receipt.controller');

const router = express.Router();


router.get('/:expenseId', authenticateToken, ReceiptController.getReceipt);

module.exports = router;
