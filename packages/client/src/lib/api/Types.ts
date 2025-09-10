export interface Category {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
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