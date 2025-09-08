// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import type { User, LoginData, RegisterData } from "../lib/api/Types.ts";
// import * as api from "../lib/api/api.ts"

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (data: LoginData) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   logout: () => void;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (data: LoginData) => {
//     const res = await api.login(data);
//     setUser(res.user);
//     localStorage.setItem("user", JSON.stringify(res.user));
//     localStorage.setItem("token", res.token);
//   };

//   const register = async (data: RegisterData) => {
//     const res = await api.register(data);
//     setUser(res.user);
//     localStorage.setItem("user", JSON.stringify(res.user));
//     localStorage.setItem("token", res.token);
//   };

//   const logout = () => {
//     api.logout();
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//     {children}  {/* <-- ici */}
//     </AuthContext.Provider>

//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
//   }
//   return context;
// };
