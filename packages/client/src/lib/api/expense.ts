import { apiRequest, apiFormRequest, API_BASE_URL } from './helpers';
import type { Expense } from './Types';

class ExpenseApi {
  async getExpenses(filters?: {
    start?: string;
    end?: string;
    category?: string;
    type?: 'one-time' | 'recurring';
  }): Promise<Expense[]> {
    const params = new URLSearchParams();
    if (filters?.start) params.append('start', filters.start);
    if (filters?.end) params.append('end', filters.end);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.type) params.append('type', filters.type);

    const query = params.toString();
    return apiRequest(`/expenses${query ? `?${query}` : ''}`);

  }

  async getExpense(id: string): Promise<Expense> {
    return apiRequest(`/expenses/${id}`);

  }

  async createExpense(expense: {
    amount: number;
    date?: string;
    categoryId: string;
    description: string;
    type: 'one-time' | 'recurring';
    startDate?: string;
    endDate?: string;
  }, receiptFile?: File): Promise<Expense> {
    const formData = new FormData();
    formData.append('amount', expense.amount.toString());
    formData.append('categoryId', expense.categoryId);
    formData.append('description', expense.description);
    formData.append('type', expense.type);

    if (expense.type === 'one-time' && expense.date) {
      formData.append('date', expense.date);
    }
    if (expense.type === 'recurring' && expense.startDate) {
      formData.append('startDate', expense.startDate);
      if (expense.endDate) {
        formData.append('endDate', expense.endDate);
      }
    }

    if (receiptFile) {
      formData.append('receipt', receiptFile);
    }

    return apiFormRequest('/expenses', formData);
  }

  async updateExpense(
    id: string,
    expense: {
      amount: number;
      date?: string;
      categoryId: string;
      description: string;
      type: 'one-time' | 'recurring';
      startDate?: string;
      endDate?: string;
    },
    receiptFile?: File
  ): Promise<Expense> {
    const formData = new FormData();
    formData.append('amount', expense.amount.toString());
    formData.append('categoryId', expense.categoryId);
    formData.append('description', expense.description);
    formData.append('type', expense.type);

    if (expense.type === 'one-time' && expense.date) {
      formData.append('date', expense.date);
    }
    if (expense.type === 'recurring' && expense.startDate) {
      formData.append('startDate', expense.startDate);
      if (expense.endDate) {
        formData.append('endDate', expense.endDate);
      }
    }

    if (receiptFile) {
      formData.append('receipt', receiptFile);
    }

    return apiFormRequest(`/expenses/${id}`, formData, 'PUT');
  }

  async deleteExpense(id: string): Promise<void> {
    return apiRequest(`/expenses/${id}`, {
      method: 'DELETE',
    });
  }

  // Receipt handling
  getReceiptUrl(expenseId: string): string {
    return `${API_BASE_URL}/receipts/${expenseId}`;
  }
}

export const expenseApi = new ExpenseApi();