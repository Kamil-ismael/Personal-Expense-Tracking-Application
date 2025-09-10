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
