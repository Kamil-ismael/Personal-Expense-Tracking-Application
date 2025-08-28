const express = require('express');
const router = express.Router();
const { GetSummary, GetSummaryMounthly, GetSummaryAlert } = require('../controller/summary.controller');
const authenticateToken = require('../prisma/auth');

router.get('/summary', authenticateToken,GetSummary);
router.get('/summary/monthly', authenticateToken,GetSummaryMounthly);
router.get('/summary/alert', authenticateToken,GetSummaryAlert)

module.exports = router
