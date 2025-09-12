const prisma = require("../lib/prisma");

class SummaryController {
  // Get monthly summary
  static async getMonthlySummary(req, res) {
    try {
      const { month } = req.query;

      const currentDate = month ? new Date(month + "-01") : new Date();
      const year = currentDate.getFullYear();
      const monthNum = currentDate.getMonth() + 1;

      const startDate = new Date(year, monthNum - 1, 1);
      const endDate = new Date(year, monthNum, 0);

      // Get incomes for the month
      const incomes = await prisma.income.findMany({
        where: {
          userId: req.user.id,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      // Get one-time expenses for the month
      const oneTimeExpenses = await prisma.expense.findMany({
        where: {
          userId: req.user.id,
          type: "one-time",
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          category: true,
        },
      });

      // Get recurring expenses that are active in this month
      const recurringExpenses = await prisma.expense.findMany({
        where: {
          userId: req.user.id,
          type: "recurring",
          startDate: {
            lte: endDate,
          },
          OR: [{ endDate: { gte: startDate } }, { endDate: null }],
        },
        include: {
          category: true,
        },
      });

      const totalIncome = incomes.reduce(
        (sum, income) => sum + parseFloat(income.amount),
        0
      );
      const oneTimeTotal = oneTimeExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );
      const recurringTotal = recurringExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );
      const totalExpenses = oneTimeTotal + recurringTotal;
      const balance = totalIncome - totalExpenses;

      // Calculate expenses by category
      const categoryMap = new Map();
      const colors = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#06B6D4",
        "#F97316",
        "#84CC16",
      ];
      let colorIndex = 0;

      [...oneTimeExpenses, ...recurringExpenses].forEach((expense) => {
        const categoryName = expense.category?.name || "Uncategorized";
        const currentAmount = categoryMap.get(categoryName) || 0;
        categoryMap.set(
          categoryName,
          currentAmount + parseFloat(expense.amount)
        );
      });

      const expensesByCategory = Array.from(categoryMap.entries()).map(
        ([category, amount]) => ({
          category,
          amount,
          color: colors[colorIndex++ % colors.length],
        })
      );

      // Get monthly trends (last 6 months)
      const monthlyTrends = await SummaryController._getMonthlyTrends(
        req.user.id,
        year,
        monthNum
      );

      res.json({
        totalIncome,
        totalExpenses,
        balance,
        expensesByCategory,
        monthlyTrends,
      });
    } catch (error) {
      console.error("Get monthly summary error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Get budget alerts
  static async getBudgetAlerts(req, res) {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      // Get current month income
      const incomes = await prisma.income.findMany({
        where: {
          userId: req.user.id,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      // Get current month expenses
      const oneTimeExpenses = await prisma.expense.findMany({
        where: {
          userId: req.user.id,
          type: "one-time",
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      const recurringExpenses = await prisma.expense.findMany({
        where: {
          userId: req.user.id,
          type: "recurring",
          startDate: {
            lte: endDate,
          },
          OR: [{ endDate: { gte: startDate } }, { endDate: null }],
        },
      });

      const totalIncome = incomes.reduce(
        (sum, income) => sum + parseFloat(income.amount),
        0
      );
      const totalExpenses = [...oneTimeExpenses, ...recurringExpenses].reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );

      if (totalExpenses > totalIncome) {
        const overageAmount = totalExpenses - totalIncome;
        return res.json({
          alert: true,
          message: `You've exceeded your monthly budget by $${overageAmount.toFixed(
            2
          )}`,
          overageAmount,
        });
      }

      res.json({ alert: false });
    } catch (error) {
      console.error("Get budget alerts error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Private helper method for monthly trends
  static async _getMonthlyTrends(userId, year, monthNum) {
    const monthlyTrends = [];

    for (let i = 5; i >= 0; i--) {
      const trendDate = new Date(year, monthNum - 1 - i, 1);
      const trendYear = trendDate.getFullYear();
      const trendMonth = trendDate.getMonth() + 1;
      const trendStartDate = new Date(trendYear, trendMonth - 1, 1);
      const trendEndDate = new Date(trendYear, trendMonth, 0);

      // Get month income
      const monthIncomes = await prisma.income.findMany({
        where: {
          userId,
          date: {
            gte: trendStartDate,
            lte: trendEndDate,
          },
        },
      });

      // Get month expenses
      const monthOneTimeExpenses = await prisma.expense.findMany({
        where: {
          userId,
          type: "one-time",
          date: {
            gte: trendStartDate,
            lte: trendEndDate,
          },
        },
      });

      const monthRecurringExpenses = await prisma.expense.findMany({
        where: {
          userId,
          type: "recurring",
          startDate: {
            lte: trendEndDate,
          },
          OR: [{ endDate: { gte: trendStartDate } }, { endDate: null }],
        },
      });

      const monthIncome = monthIncomes.reduce(
        (sum, income) => sum + parseFloat(income.amount),
        0
      );
      const monthExpenses = [
        ...monthOneTimeExpenses,
        ...monthRecurringExpenses,
      ].reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

      monthlyTrends.push({
        month: trendDate.toLocaleDateString("en-US", { month: "short" }),
        expenses: monthExpenses,
        income: monthIncome,
      });
    }

    return monthlyTrends;
  }
}

module.exports = { SummaryController };