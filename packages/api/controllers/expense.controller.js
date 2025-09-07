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
    const expenses = prisma.expense.findMany({
        where : { userId }
    })
}