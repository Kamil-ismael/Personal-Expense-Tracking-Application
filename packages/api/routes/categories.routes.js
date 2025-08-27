const express = require('express');
const categoryController = require('../controllers/category.controller')
const {autheticateToken} = require('../middleware/auth');

const router = express.Router();
router.use(autheticateToken)
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);