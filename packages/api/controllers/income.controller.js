const prisma = require('../lib/prisma');

const incomeController = {
    async getAllIncomes(req, res) {
        try {
            const { start, end} = req.query;
            const where = { userId: req.user.id };
            if(start){
                where.date = { gte: new Date(start) };
            }
            if(end){
                where.date = where.date || {};
                where.date.lte = new Date(end);
            }
            const incomes = await prisma.income.findMany({
                where,
                orderBy: { date: 'desc' }
            });
            res.json(incomes);
        } catch (error) {
            console.error('Get incomes error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getIncomesById(req, res){
        try {
            const { id } = req.params;
            const income = await prisma.income.findFirst({
                where: {
                    id,
                    userId: req.user.id
                }
            });
            if(!income){
                return res.status(404).json({ error: 'Income not found' });
            }
            res.json(income);
        } catch (error) {
            console.error('Get income error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async createIncome(req, res){
        try {
            const { amount, date, source, description } = req.body;
            if(!amount || !date || !source){
                return res.status(400).json({ error: 'Amount, date, and source are required' });
            }
            const income = await prisma.income.create({
                data: {
                    amount: parseFloat(amount),
                    date: new Date(date),
                    source,
                    description: description || '',
                    userId: req.user.id
                }
            });
            res.status(201).json(income);
        } catch (error){
            console.error('Create income error:', error);
            res.status(500).json({ error: 'Internal server error '});
        }
    },
    async updateIncome(req, res){
        try {
            const { id } = req.params;
            const { amount, date, source, description } = req.body;
            const income = await prisma.income.update({
                where: {
                id,
                userId: req.user.id
                },
                data: {
                amount: parseFloat(amount),
                date: new Date(date),
                source,
                description: description || ''
                }
            });
            res.json(income);
        } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Income not found' });
        }
        console.error('Update income error:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    },
    async deleteIncome (req, res) {
        try {
            const { id } = req.params;

            await prisma.income.delete({
                where: {
                id,
                userId: req.user.id
                }
            });
            res.status(204).send();
        } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Income not found' });
        }
        console.error('Delete income error:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = incomeController;