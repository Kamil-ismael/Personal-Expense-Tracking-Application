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
    async updateCategory(req, res){
        try {
            const { id } = req.params;
            const { name } = req.body;
            if(!name || name.trim()){
                return res.status(400).json({error: 'Category name is required'});
            }
            const category = await prisma.category.update({
                where:{
                    id,
                    userId: req.user.id
                },
                data:{
                    name: name.trim()
                }
            });
            res.json(category);
        } catch (error) {
            if(error.code === 'P2025'){
                return res.status(404).json({error: 'Category not found'});
            }
            if(error.code === 'P2002'){
                return res.status(400).json({error: 'Category name already exists'});
            }
            console.error('Update category error:', error);
            res.status(500).json({error: 'Internal server error'})
        }
    }
};

module.exports = incomeController;