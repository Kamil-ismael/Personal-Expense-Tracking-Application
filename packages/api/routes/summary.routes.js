const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { SummaryController } = require('../controllers/summary.controller');

const router = express.Router()
router.use(authenticateToken)
router.get('/monthly', SummaryController.getMonthlySummary);
router.get('/alerts', SummaryController.getBudgetAlerts);
module.exports = router;