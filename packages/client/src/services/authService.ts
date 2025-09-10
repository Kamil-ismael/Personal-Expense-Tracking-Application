import { getAuthToken } from '../lib/api/helpers'
import type { User } from '../lib/api/Types.ts';
import { authApi } from '../lib/api/auth';

class AuthService {
  async signup(email: string, password: string): Promise<User> {
    const response = await authApi.signup(email, password);
    return response.user;
  }

  async login(email: string, password: string): Promise<User> {
    const response = await authApi.login(email, password);
    return response.user;
  }

  async logout(): Promise<void> {
    await authApi.logout();
  }

  getCurrentUser(): User | null {
    const token = getAuthToken();
    if (!token) return null;

    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId,
        email: payload.email
      };
    } catch {
      return null;
    }
  }

  async getCurrentUserAsync(): Promise<User | null> {
    try {
      return await authApi.getCurrentUser();
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = getAuthToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  async isAuthenticatedAsync(): Promise<boolean> {
    try {
      await authApi.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
export type { User };