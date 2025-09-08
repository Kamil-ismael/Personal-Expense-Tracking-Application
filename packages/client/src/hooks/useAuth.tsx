import { createContext, useContext,
     useState,useEffect, type ReactNode } from "react";
import type { User, LoginData, RegisterData} from "../lib/api/Types.ts"
import * as api from "../lib/api/api.ts"

interface AuthContextType {
    user: User | null;
    loading : boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps{
    children : ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) =>{
    const [user, setUser] = useState<User| null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    // useEffect((): void => {
    //     const storedUser = localStorage.getItem("token")
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser))
    //     }
    //     setLoading(false)
    // },[]);

    const login = async (data: LoginData) => {
        const res = await api.login(data)
        setUser(res.user)
        localStorage.setItem("user", JSON.stringify(res.user))
        localStorage.setItem("token", res.token)
    }

    const register = async (data: RegisterData) => {
        const res = await api.register(data);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
    };

    const logout = () => {
        api.logout();
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={ {user , loading , login , register , logout} }>
        {children}
        </AuthContext.Provider>
  );
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
    }
    return context
}