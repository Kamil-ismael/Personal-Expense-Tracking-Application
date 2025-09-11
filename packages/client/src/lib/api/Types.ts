export interface Category {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
}
export interface Expense {
  id: string;
  userId: string;
  amount: number;
  date?: string;
  categoryId: string;
  description: string;
  type: 'one-time' | 'recurring';
  startDate?: string;
  endDate?: string;
  receiptUrl?: string;
  createdAt: string;
  category?: Category;
}
export interface Income {
  id: string;
  userId: string;
  amount: number;
  date: string;
  source: string;
  description: string;
  createdAt: string;
}

export interface MonthlySummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expensesByCategory: Array<{ category: string; amount: number; color: string }>;
  monthlyTrends: Array<{ month: string; expenses: number; income: number }>;
}

export interface BudgetAlert {
  alert: boolean;
  message?: string;
  overageAmount?: number;
}