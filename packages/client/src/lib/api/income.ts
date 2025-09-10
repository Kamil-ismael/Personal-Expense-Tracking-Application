import type { Income } from "./Types.ts";
import { apiRequest } from "./helpers";

class IncomeApi {
  async getIncomes(filters?: {
    start?: string;
    end?: string;
  }): Promise<Income[]> {
    const params = new URLSearchParams();
    if (filters?.start) params.append("start", filters.start);
    if (filters?.end) params.append("end", filters.end);

    const query = params.toString();
    return apiRequest(`/incomes${query ? `?${query}` : ""}`);
  }

  async getIncome(id: string): Promise<Income> {
    return apiRequest(`/incomes/${id}`);
  }

  async createIncome(income: {
    amount: number;
    date: string;
    source: string;
    description: string;
  }): Promise<Income> {
    return apiRequest("/incomes", {
      method: "POST",
      body: JSON.stringify(income),
    });
  }

  async updateIncome(
    id: string,
    income: {
      amount: number;
      date: string;
      source: string;
      description: string;
    }
  ): Promise<Income> {
    return apiRequest(`/incomes/${id}`, {
      method: "PUT",
      body: JSON.stringify(income),
    });
  }

  async deleteIncome(id: string): Promise<void> {
    return apiRequest(`/incomes/${id}`, {
      method: "DELETE",
    });
  }
}
export const incomeApi = new IncomeApi();
