import { useState, useEffect } from 'react';
import { incomeApi } from '../lib/api/income';
import type { Income } from '../lib/api/Types';

export function useIncomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    loadIncomes();
  }, [dateRange]);

  const loadIncomes = async () => {
    try {
      setLoading(true);
      const data = await incomeApi.getIncomes({
        start: dateRange.start || undefined,
        end: dateRange.end || undefined
      });
      setIncomes(data);
    } catch (error) {
      console.error('Failed to load incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this income entry?')) {
      return;
    }

    try {
      await incomeApi.deleteIncome(id);
      setIncomes(incomes.filter(income => income.id !== id));
    } catch (error) {
      console.error('Failed to delete income:', error);
      alert('Failed to delete income');
    }
  };

  const filteredIncomes = incomes.filter(income =>
    income.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    income.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + Number(income.amount), 0);

  return {
    incomes: filteredIncomes,
    loading,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    totalIncome,
    handleDelete,
    loadIncomes
  };
}