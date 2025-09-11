import prisma from "../lib/prisma.js"

const createExpense = async (req, res) => {
  try {
    const {
      amount, date, categoryId,
      description, type, startDate,
      endDate, receiptUrl
    } = req.body

    if (!amount || !date || !categoryId) {
      return res.status(400).json({ error: "amount, date et categoryId sont obligatoires" })
    }

    const expense = await prisma.expense.create({
      data: {
        amount,
        date,
        categoryId,
        description,
        type,
        startDate,
        endDate,
        receiptUrl,
        userId: req.user.id
      }
    })

    res.status(201).json(expense)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
}

const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" }
    })
    res.json(expenses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
}

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params
    const expense = await prisma.expense.findUnique({
      where: { id: Number(id) }
    })
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" })
    }
    res.json(expense)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
}

const deleteExpenseById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: "Expense ID is required" })
    }

    await prisma.expense.delete({
      where: { id: Number(id) }
    })

    res.json({ message: "Expense deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
}

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params
    const {
      amount, date, type,
      description, categoryId, receiptUrl
    } = req.body

    if (!id) {
      return res.status(400).json({ error: "Expense ID is required" })
    }

    const expense = await prisma.expense.update({
      where: { id: Number(id) },
      data: { amount, date, type, description, categoryId, receiptUrl }
    })

    res.json(expense)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
}

export {
  createExpense,
  getExpenses,
  getExpenseById,
  deleteExpenseById,
  updateExpense
}
