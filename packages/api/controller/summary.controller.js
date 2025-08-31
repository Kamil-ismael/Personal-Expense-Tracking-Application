const prisma = require('../lib/prisma');

const GetSummary = async (req, res) => {
    try {
        const incomes = await prisma.income.aggregate({
            _sum: { amount: true}
        })
        const expenses = await prisma.expense.aggregate({ _sum: { amount:true}})

        res.json({
            incomes: incomes.sum.amount || 0,
            expenses: expenses.sum.amount || 0,
            balance: (incomes.sum.amount || 0) - (expenses.sum.amount || 0)
        })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

const GetSummaryMounthly = async (req,res) => {
    try {
        const monthly = await prisma.expense.groupBy({
            by:["month"],
            _sum: { amount:true}
        })
        res.json(monthly)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

const GetSummaryAlert = async (req, res) => {
    try {
        const expenses = await prisma.expense.aggregate({
            _sum: { amount:true}
        })
        
        const alerts = [];
        const limiteExpence = 1000;

        if((expenses.sum.amount || 0) > limiteExpence) {
            alerts.push(`votre depense a depasser la limite de ${limiteExpence}`);
        }
        res.json({ alerts });
        
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

module.exports = { GetSummary, GetSummaryMounthly, GetSummaryAlert };