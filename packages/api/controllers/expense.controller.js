import prisma from "../lib/prisma"

const createExpense = async (req, res)=>{
    try{
        const {amount, date,
             categoryId, description,
              type, startDate, endDate,
            receiptUrl} = req.body
        const expense = await prisma.expense.create({
            data:{
                amount, date, categoryId, description, type, startDate, endDate, receiptUrl
            }
        }) 
        res.status(201).json(expense)
    }
    catch(err){
        console.error(err);
    }
}

const getExpesenses = async (req, res)=>{
    try{
        const expenses = prisma.expense.findMany({
            where : { userId : req.user.id }
        })
        res.json(expenses)
    }
    catch(err){
        console.error(err);
        res.status(500).json({error : "Internal server error"})
    }
}

const getExpesensesById = async (req, res) => {
    try{
        const {id} = req.headers["id"]
        const expense = await prisma.expense.findUnique({
            where : {id}
        })
        if(!expense){
            return res.status(404).json({error : "xpense not found"})
        }
        res.json(expense)
    }
    catch(err){
        console.error(err);
        res.status(500).json({error : "Iternal server error"})
    }
}

const deleteExpenseById = async (req, res) =>{
    try{
        const {id} = req.headers["id"]
        if (!id) {
            return res.status(400).json({error : "Expense ID is required"})
        }
        await prisma.expense.delete({
            where: {id}
        })
    }
    catch(err){

    }
}

const updateExpense = async (req, res) =>{
    try{
        const {id} = req.headers["id"]
        const {amount, date, type, description, categoryId, receiptUrl} = req.body
        if(!id){
            return res.status(400).json({error : "Expense ID is required"})
        }
        const expense = await prisma.expense.update({
            where : {id},
            data : {amount, date, type, description, categoryId, receiptUrl}
    }
        )
        res.json(expense)
    }
    catch(err){
        console.error(err);
        res.status(500).json({error : "Internal server error"})
    }
}

module.exports = { createExpense, getExpesenses, getExpesensesById, deleteExpenseById, updateExpense}