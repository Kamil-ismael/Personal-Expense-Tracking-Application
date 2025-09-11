import { useState, useEffect } from "react";
import { categoryApi } from "../lib/api/category";
import type { Category } from "../lib/api/Types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const newCategory = await categoryApi.createCategory(
        newCategoryName.trim()
      );
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setIsAddingNew(false);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create category"
      );
    }
  };

  const handleEditCategory = async (id: string) => {
    if (!editingName.trim()) return;
    try {
      const updatedCategory = await categoryApi.updateCategory(
        id,
        editingName.trim()
      );
      setCategories(
        categories.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      setEditingId(null);
      setEditingName("");
      setError("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update category"
      );
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await categoryApi.deleteCategory(id);
      setCategories(categories.filter((cat) => cat.id !== id));
      setError("");
    } catch (error) {
      console.error("Delete category error:", error);
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes("violates foreign key constraint") ||
          errorMessage.includes("expenses_category_id_fkey") ||
          errorMessage.includes("key is still referenced") ||
          errorMessage.includes("23503")
        ) {
          setError(
            "Cannot delete category: it is currently linked to existing expenses. Please reassign or delete associated expenses first."
          );
        } else {
          setError(error.message || "Failed to delete category");
        }
      } else {
        setError("Failed to delete category");
      }
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const cancelAddingNew = () => {
    setIsAddingNew(false);
    setNewCategoryName("");
  };

  return {
    // State
    categories,
    loading,
    editingId,
    editingName,
    newCategoryName,
    isAddingNew,
    error,

    // Actions
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    startEditing,
    cancelEditing,
    cancelAddingNew,

    // Setters
    setEditingName,
    setNewCategoryName,
    setIsAddingNew,
    setError,
  };
}
