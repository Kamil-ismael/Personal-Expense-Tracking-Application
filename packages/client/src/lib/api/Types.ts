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

export interface User {
  id: string;
  email: string;
  token?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
