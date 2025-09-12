import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { expenseApi } from '../lib/api/expense';
import { categoryApi } from '../lib/api/category';
import { Category } from '../lib/api/Types';

interface ExpenseFormData {
  amount: number;
  date: string;
  categoryId: string;
  description: string;
  type: 'one-time' | 'recurring';
  startDate: string;
  endDate: string;
}

export function ExpenseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [existingReceipt, setExistingReceipt] = useState<string>('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ExpenseFormData>();

  const expenseType = watch('type');

  useEffect(() => {
    loadCategories();
    if (isEdit) {
      loadExpense();
    }
  }, [isEdit, id]);

  const loadCategories = async () => {
    try {
      const data = await categoryApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadExpense = async () => {
    if (!id) return;
    
    try {
      const expense = await expenseApi.getExpense(id);
      setValue('amount', expense.amount);
      setValue('date', expense.date || '');
      setValue('categoryId', expense.categoryId);
      setValue('description', expense.description);
      setValue('type', expense.type);
      setValue('startDate', expense.startDate || '');
      setValue('endDate', expense.endDate || '');
      setExistingReceipt(expense.receiptUrl || '');
    } catch (error) {
      console.error('Failed to load expense:', error);
      setError('Failed to load expense');
    }
  };

  const onSubmit = async (data: ExpenseFormData) => {
    setLoading(true);
    setError('');

    try {
      const formData = {
        amount: data.amount,
        date: data.type === 'one-time' ? data.date : undefined,
        categoryId: data.categoryId,
        description: data.description,
        type: data.type,
        startDate: data.type === 'recurring' ? data.startDate : undefined,
      };

      if (isEdit && id) {
        await expenseApi.updateExpense(id, formData, receiptFile || undefined);
      } else {
        await expenseApi.createExpense(formData, receiptFile || undefined);
      }

      navigate('/expenses');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        setError('Only JPG, PNG, and PDF files are supported');
        return;
      }
      setReceiptFile(file);
      setError('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={() => navigate('/expenses')}
          className="mr-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Expense' : 'Add New Expense'}
        </h2>
      </div>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Ar</span>
                </div>
                <input
                  {...register('amount', { 
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' }
                  })}
                  type="number"
                  step="0.01"
                  className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type *
              </label>
              <select
                {...register('type', { required: 'Type is required' })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="one-time">One-time</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              {...register('categoryId', { required: 'Category is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {expenseType === 'one-time' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  {...register('date', { 
                    required: expenseType === 'one-time' ? 'Date is required for one-time expenses' : false
                  })}
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date *
                  </label>
                  <input
                    {...register('startDate', { 
                      required: expenseType === 'recurring' ? 'Start date is required for recurring expenses' : false
                    })}
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date (Optional)
                  </label>
                  <input
                    {...register('endDate')}
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave empty for ongoing recurring expense
                  </p>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Optional description..."
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receipt (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 5MB
                </p>
              </div>
            </div>
            
            {receiptFile && (
              <div className="mt-2 flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-600">{receiptFile.name}</span>
                <button
                  type="button"
                  onClick={() => setReceiptFile(null)}
                  className="text-red-600 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {existingReceipt && !receiptFile && (
              <div className="mt-2 text-sm text-gray-600">
                Current receipt: <span className="font-medium">Receipt attached</span>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/expenses')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEdit ? 'Update' : 'Create'} Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
