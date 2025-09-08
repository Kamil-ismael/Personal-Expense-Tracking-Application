import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email != "" && password!="") {
            try {
                login(email, password)
                navigate("/Home");
            } catch (err) {
                console.error("Erreur de connexion :", err);
            }
        }
        else{
            alert("une ou plusieures information maquantes")
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form
                className="flex flex-col w-96 shadow-2xl m-auto items-center justify-around
                bg-white p-8 rounded-2xl cursor-default space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="bg-blue-400 p-5 rounded-full">
                <LogIn size={32} className="text-white" />
                </div>
                <div className="flex flex-col text-center space-y-1">
                <h1 className="text-2xl font-semibold">Sign in to your account</h1>
                <p className="text-sm text-gray-600">
                    or{" "}
                    <span 
                    className="text-blue-400 cursor-pointer font-medium hover:underline"
                    onClick={() => navigate("/signIn")}
                    >
                    create a new account
                    </span>
                </p>
                </div>
                <div className="w-full space-y-2">
                <p>Email address</p>
                <input
                    type="text"
                    placeholder="Enter your email"
                    className="border-gray-300 border-2 w-full h-10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Password</p>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="border-gray-300 border-2 w-full h-10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button 
                type="submit" 
                className="bg-blue-400 w-full p-3 rounded-md cursor-pointer text-white font-medium
                            hover:bg-blue-500 transition-colors"
                >
                Sign in
                </button>
            </form>
        </div>

    );
}

export default LoginPage;
