import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSign from "../hooks/useSign";
import { UserRoundPlus } from "lucide-react";

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("❌ Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const result = await useSign(email, password);
            console.log(result);
            navigate("/");
        } catch (err) {
            console.error("Erreur lors de l'inscription :", err);
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
                <UserRoundPlus size={32} className="text-white" />
                </div>
                <div className="flex flex-col text-center space-y-1">
                <h1 className="text-2xl font-semibold">Create your account</h1>
                <p className="text-sm text-gray-600">
                    or{" "}
                    <span 
                    className="text-blue-400 cursor-pointer font-medium hover:underline"
                    onClick={() => navigate("/")}
                    >
                    sign in to your existing account
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
                <p>Confirm your password</p>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    className="border-gray-300 border-2 w-full h-10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <button 
                type="submit" 
                className="bg-blue-400 w-full p-3 rounded-md cursor-pointer text-white font-medium
                            hover:bg-blue-500 transition-colors"
                >
                Create Account
                </button>
            </form>
        </div>

    );
}

export default SignInPage;
