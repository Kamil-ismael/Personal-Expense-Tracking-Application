import { useMemo, useState, useRef } from "react";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Card } from "../contener/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../../hooks/useApp';

const Dashboard = () => {
  const { expenses, incomes, categories } = useApp(); // Assuming useApp is defined elsewhere, e.g., a custom context hook

  const initialMonth = new Date().getMonth();
  const initialYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [tempMonth, setTempMonth] = useState(initialMonth);
  const [tempYear, setTempYear] = useState(initialYear);
  const [showPicker, setShowPicker] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const monthlyData = useMemo(() => {
    // Filtrer les dépenses du mois sélectionné
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === selectedMonth && expenseDate.getFullYear() === selectedYear;
    });

    // Filtrer les revenus du mois sélectionné
    const monthlyIncomes = incomes.filter(income => {
      const incomeDate = new Date(income.date);
      return incomeDate.getMonth() === selectedMonth && incomeDate.getFullYear() === selectedYear;
    });

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncomes = monthlyIncomes.reduce((sum, income) => sum + income.amount, 0);
    const balance = totalIncomes - totalExpenses;

    return {
      expenses: totalExpenses,
      incomes: totalIncomes,
      balance,
      isOverBudget: totalExpenses > totalIncomes,
      overBudgetAmount: totalExpenses - totalIncomes
    };
  }, [expenses, incomes, selectedMonth, selectedYear]);

  const categoryData = useMemo(() => {
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === selectedMonth && expenseDate.getFullYear() === selectedYear;
    });

    const categoryTotals = monthlyExpenses.reduce((acc, expense) => {
      const category = categories.find(cat => cat.id === expense.categoryId);
      if (category) {
        acc[category.name] = (acc[category.name] || 0) + expense.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      color: categories.find(cat => cat.name === name)?.color || '#8884d8'
    }));
  }, [expenses, categories, selectedMonth, selectedYear]);

  const monthlyTrends = useMemo(() => {
    const last6Months = [];
    const baseDate = new Date(selectedYear, selectedMonth, 1);
    for (let i = 5; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() - i);
      const month = date.getMonth();
      const year = date.getFullYear();

      const monthExpenses = expenses
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);

      const monthIncomes = incomes
        .filter(income => {
          const incomeDate = new Date(income.date);
          return incomeDate.getMonth() === month && incomeDate.getFullYear() === year;
        })
        .reduce((sum, income) => sum + income.amount, 0);

      last6Months.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        expenses: monthExpenses,
        incomes: monthIncomes,
      });
    }
    return last6Months;
  }, [expenses, incomes, selectedMonth, selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const currentMonthName = new Date(selectedYear, selectedMonth).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const months = Array.from({ length: 12 }, (_, i) => 
    new Date(0, i).toLocaleDateString('en-US', { month: 'long' })
  );

  const years = Array.from({ length: 11 }, (_, i) => initialYear - 5 + i);

  const handleButtonClick = () => {
    setTempMonth(selectedMonth);
    setTempYear(selectedYear);
    setShowPicker(!showPicker);
  };

  const handleConfirm = () => {
    setSelectedMonth(tempMonth);
    setSelectedYear(tempYear);
    setShowPicker(false);
  };

  const positionLogo = "absolute top-2 right-2";
  const titleGraphique = "font-bold absolute top-2 left-2";

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="relative">
          <button 
            ref={buttonRef}
            className="flex cursor-pointer text-xl"
            onClick={handleButtonClick}
          >
            <Calendar className="mr-1" />
            {currentMonthName}
          </button>
          {showPicker && (
            <div className="absolute top-full right-0 bg-white  shadow-xl rounded-lg p-6 border-2 z-10">
              <div className="flex space-x-4">
                <select 
                  value={tempMonth}
                  onChange={(e) => setTempMonth(parseInt(e.target.value))}
                  className="border p-2 rounded"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
                <select 
                  value={tempYear}
                  onChange={(e) => setTempYear(parseInt(e.target.value))}
                  className="border p-2 rounded"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleConfirm}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Totaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <Card>
          <TrendingUp className={`text-emerald-600 ${positionLogo}`} />
          <p className="text-gray-600">Total Revenus</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyData.incomes)}</p>
        </Card>

        <Card>
          <TrendingDown className={`text-red-600 ${positionLogo}`} />
          <p className="text-gray-600">Total Dépenses</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyData.expenses)}</p>
        </Card>

        <Card>
          <DollarSign className={`text-emerald-700 ${positionLogo}`} />
          <p className="text-gray-600">Solde Actuel</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyData.balance)}</p>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <Card>
          <h1 className={`${titleGraphique}`}>Expense by category</h1>
          <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
        </Card>
        <Card>
          <h1 className={`${titleGraphique}`}>Monthly Trends</h1>
          <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}€`} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="incomes" fill="#10b981" name="Revenus" />
                <Bar dataKey="expenses" fill="#ef4444" name="Dépenses" />
              </BarChart>
            </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;