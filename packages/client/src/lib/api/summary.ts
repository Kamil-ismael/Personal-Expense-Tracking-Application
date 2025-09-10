import { MonthlySummary, BudgetAlert } from "./types";
import { apiRequest } from "./helpers";

class SummaryService {
  // Summary and analytics
  async getMonthlySummary(month?: string): Promise<MonthlySummary> {
    const params = new URLSearchParams();
    if (month) params.append("month", month);

    const query = params.toString();
    return apiRequest(`/summary/monthly${query ? `?${query}` : ""}`);
  }

  async getBudgetAlert(): Promise<BudgetAlert> {
    return apiRequest("/summary/alerts");
  }
}

export const summaryService = new SummaryService();
