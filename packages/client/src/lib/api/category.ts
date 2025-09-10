import { apiRequest } from "./helpers";
import type { Category } from "./Types";

class CategoryApi {
  async getCategories(): Promise<Category[]> {
    return apiRequest("/categories");
  }

  async createCategory(name: string): Promise<Category> {
    return apiRequest("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    return apiRequest(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    });
  }

  async deleteCategory(id: string): Promise<void> {
    return apiRequest(`/categories/${id}`, {
      method: "DELETE",
    });
  }
}

export const categoryApi = new CategoryApi();
