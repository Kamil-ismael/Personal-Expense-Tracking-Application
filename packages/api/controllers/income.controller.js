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
    }
};

module.exports = incomeController;