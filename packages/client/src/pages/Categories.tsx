import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import type { Category } from '../lib/api/types';

export function Categories() {
  const {
    categories,
    loading,
    editingId,
    editingName,
    newCategoryName,
    isAddingNew,
    error,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    startEditing,
    cancelEditing,
    cancelAddingNew,
    setEditingName,
    setNewCategoryName,
    setIsAddingNew
  } = useCategories();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
            Categories
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your expense categories. You cannot delete categories that are in use by existing expenses.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}