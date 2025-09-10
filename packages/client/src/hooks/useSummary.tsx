
import { useContext } from 'react';
import { AppContext } from '../context/AppContext'; 

interface AppContextType {
  expenses: Array<{ id: string; date: string; amount: number; categoryId: string }>;
  incomes: Array<{ id: string; date: string; amount: number }>;
  categories: Array<{ id: string; name: string; color: string }>;
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé dans un AppContextProvider');
  }
  return context;
};