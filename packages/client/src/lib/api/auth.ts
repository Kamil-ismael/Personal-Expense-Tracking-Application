import { apiRequest, setAuthToken, removeAuthToken } from "./helpers";
import type { User } from "./Types.ts";

class AuthApi {
  // Connexion
  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Gestion des erreurs
      if (response.message === "email non trouvé") {
        throw new Error("Email absent de la base de données");
      }
      if (response.message === "mot de passe incorrect") {
        throw new Error("Connexion échouée : mot de passe incorrect");
      }

      // Stockage du token (une seule fois, pas de doublon)
      if (response.token) {
        setAuthToken(response.token);
      }

      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  // Inscription
  async signup(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      const response = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Stockage du token si l'inscription réussit
      if (response.token) {
        setAuthToken(response.token);
      }

      return response;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    removeAuthToken();
  }

  // Récupération de l'utilisateur courant
  async getCurrentUser(): Promise<User> {
    const response = await apiRequest("/auth/me");
    return response.user;
  }
}

export const authApi = new AuthApi();