//api/controllers/expenses.controller.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const prisma = require('../lib/prisma');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPG, PNG, and PDF files are allowed'));
        }
    }
});

class ExpenseController {
    // Get all expenses for user
    static async getAllExpenses(req, res) {
        try {
            const { start, end, category, type } = req.query;

            const where = {
                userId: req.user.id
            };

            if (start || end) {
                where.OR = [];

                const oneTimeFilter = { type: 'one-time' };
                if (start) oneTimeFilter.date = { gte: new Date(start) };
                if (end) {
                    oneTimeFilter.date = oneTimeFilter.date || {};
                    oneTimeFilter.date.lte = new Date(end);
                }
                where.OR.push(oneTimeFilter);

                const recurringFilter = { type: 'recurring' };
                if (start) recurringFilter.startDate = { lte: new Date(end || new Date()) };
                if (end) {
                    recurringFilter.OR = [
                        { endDate: { gte: new Date(start) } },
                        { endDate: null }
                    ];
                }
                where.OR.push(recurringFilter);
            }

            if (category) {
                where.categoryId = category;
            }

            if (type) {
                where.type = type;
            }

            const expenses = await prisma.expense.findMany({
                where,
                include: {
                    category: true
                },
                orderBy: { createdAt: 'desc' }
            });

            res.json(expenses);
        } catch (error) {
            console.error('Get expenses error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getExpenseById(req, res) {
        try {
            const { id } = req.params;

            const expense = await prisma.expense.findFirst({
                where: {
                    id,
                    userId: req.user.id
                },
                include: {
                    category: true
                }
            });

            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }

            res.json(expense);
        } catch (error) {
            console.error('Get expense error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createExpense(req, res) {
        try {
            const { amount, date, categoryId, description, type, startDate, endDate } = req.body;

            if (!amount || !categoryId) {
                return res.status(400).json({ error: 'Amount and category are required' });
            }

            if (type === 'one-time' && !date) {
                return res.status(400).json({ error: 'Date is required for one-time expenses' });
            }

            if (type === 'recurring' && !startDate) {
                return res.status(400).json({ error: 'Start date is required for recurring expenses' });
            }

            const expenseData = {
                amount: parseFloat(amount),
                categoryId,
                description: description || '',
                type: type || 'one-time',
                userId: req.user.id
            };

            if (type === 'one-time') {
                expenseData.date = new Date(date);
            } else {
                expenseData.startDate = new Date(startDate);
                if (endDate) {
                    expenseData.endDate = new Date(endDate);
                }
            }

            if (req.file) {
                expenseData.receiptUrl = req.file.filename;
            }

            const expense = await prisma.expense.create({
                data: expenseData,
                include: {
                    category: true
                }
            });

            res.status(201).json(expense);
        } catch (error) {
            console.error('Create expense error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateExpense(req, res) {
        try {
            const { id } = req.params;
            const { amount, date, categoryId, description, type, startDate, endDate } = req.body;

            const existingExpense = await prisma.expense.findFirst({
                where: {
                    id,
                    userId: req.user.id
                }
            });

            if (!existingExpense) {
                return res.status(404).json({ error: 'Expense not found' });
            }

            const updateData = {
                amount: parseFloat(amount),
                categoryId,
                description: description || '',
                type: type || 'one-time'
            };

            if (type === 'one-time') {
                updateData.date = new Date(date);
                updateData.startDate = null;
                updateData.endDate = null;
            } else {
                updateData.date = null;
                updateData.startDate = new Date(startDate);
                updateData.endDate = endDate ? new Date(endDate) : null;
            }

            if (req.file) {
                // Delete old receipt file if exists
                if (existingExpense.receiptUrl) {
                    const oldFilePath = path.join(__dirname, '../../uploads', existingExpense.receiptUrl);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                updateData.receiptUrl = req.file.filename;
            }

            const expense = await prisma.expense.update({
                where: { id },
                data: updateData,
                include: {
                    category: true
                }
            });

            res.json(expense);
        } catch (error) {
            console.error('Update expense error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteExpense(req, res) {
        try {
            const { id } = req.params;

            const expense = await prisma.expense.findFirst({
                where: {
                    id,
                    userId: req.user.id
                }
            });

            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            if (expense.receiptUrl) {
                const filePath = path.join(__dirname, '../../uploads', expense.receiptUrl);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await prisma.expense.delete({
                where: { id }
            });

            res.status(204).send();
        } catch (error) {
            console.error('Delete expense error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = {
    ExpenseController,
    upload
};