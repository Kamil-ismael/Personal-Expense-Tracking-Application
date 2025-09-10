import type { LoginData, RegisterData, AuthResponse } from "./Types.ts";

const API_URL = "http://localhost:8080/api";

export async function login(data: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Échec de la connexion");
  }

  return res.json();
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Échec de l’inscription");
  }

  return res.json();
}

export async function logout(): Promise<void> {

  return Promise.resolve();
}
