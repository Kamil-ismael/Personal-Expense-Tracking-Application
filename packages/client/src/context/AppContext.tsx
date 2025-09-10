// src/context/AppContext.tsx
import { createContext, useState, ReactNode } from 'react';

interface AppContextType {
  expenses: Array<{ id: string; date: string; amount: number; categoryId: string }>;
  incomes: Array<{ id: string; date: string; amount: number }>;
  categories: Array<{ id: string; name: string; color: string }>;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<AppContextType['expenses']>([]);
  const [incomes, setIncomes] = useState<AppContextType['incomes']>([]);
  const [categories, setCategories] = useState<AppContextType['categories']>([]);

  // Ajoutez ici la logique pour charger les données (ex. depuis API ou localStorage)

  return (
    <AppContext.Provider value={{ expenses, incomes, categories }}>
      {children}
    </AppContext.Provider>
  );
};
