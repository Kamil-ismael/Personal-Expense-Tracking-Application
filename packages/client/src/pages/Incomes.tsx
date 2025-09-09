import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useIncomes } from '../hooks/useIncomes';

export function Incomes() {
  const {
    incomes: filteredIncomes,
    loading,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    totalIncome,
    handleDelete
  } = useIncomes();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Income
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/incomes/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Income
          </Link>
        </div>
      </div>
      
      {/* Summary Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Income {dateRange.start && `(${dateRange.start} - ${dateRange.end || 'now'})`}
                </dt>
                <dd className="text-lg font-medium text-green-600">${totalIncome.toFixed(2)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}