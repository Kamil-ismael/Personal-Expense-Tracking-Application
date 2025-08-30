const express = require('express');
const categoryController = require('../controllers/category.controller')
const {authenticateToken} = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken)
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;