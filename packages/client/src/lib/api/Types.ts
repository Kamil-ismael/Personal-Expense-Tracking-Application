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