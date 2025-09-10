export * from "./types.ts";
export { setAuthToken, removeAuthToken, getAuthToken } from "./helpers";

import { incomeApi } from "./income";
import { categoryApi } from "./category";

class Api {
  async getCategories() {
    return categoryApi.getCategories();
  }
  async createCategory(name: string) {
    return categoryApi.createCategory(name);
  }
  async updateCategory(id: string, name: string) {
    return categoryApi.updateCategory(id, name);
  }
  async deleteCategory(id: string) {
    return categoryApi.deleteCategory(id);
  }

  async getIncomes(filters?: { start?: string; end?: string }) {
    return incomeApi.getIncomes(filters);
  }
  async getIncome(id: string) {
    return incomeApi.getIncome(id);
  }
  async createIncome(income: {
    amount: number;
    date: string;
    source: string;
    description: string;
  }) {
    return incomeApi.createIncome(income);
  }
  async updateIncome(
    id: string,
    income: {
      amount: number;
      date: string;
      source: string;
      description: string;
    }
  ) {
    return incomeApi.updateIncome(id, income);
  }
  async deleteIncome(id: string) {
    return incomeApi.deleteIncome(id);
  }
}

export const api = new Api();
