import { useContext } from 'react';
import { AuthContext } from './useAuth';

interface AppContextType {
  expenses: Array<{ id: string; date: string; amount: number; categoryId: string }>;
  incomes: Array<{ id: string; date: string; amount: number }>;
  categories: Array<{ id: string; name: string; color: string }>;
}

export const useApp = (): AppContextType => {
  const context = useContext(AuthContext as unknown as React.Context<AppContextType>);
  if (!context) {
    throw new Error('useApp doit être utilisé dans un AppContextProvider');
  }
  return context;
};