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
        <div className="h-screen flex justify-center items-center">
            <form 
                className="flex flex-col w-1/4 h-2/3 shadow-xl m-auto items-center justify-around
                bg-gray-50 p-5 rounded-xl cursor-default"
                onSubmit={handleSubmit}
            >
                <div className="bg-blue-400 p-7 rounded-sm">
                    <UserRoundPlus/>
                </div>
                <div className="flex flex-col text-center pl-7 pr-7">
                    <h1 className="text-2xl">Create your account</h1>
                    <p>
                        or{" "}
                        <span 
                            className="text-blue-400 cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            sign in to your existing account
                        </span>
                    </p>
                </div>

                <div className="w-full">
                    <p>Email address</p>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="border-gray-200 border-2 w-full h-10 rounded-md p-2"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="border-gray-200 border-2 w-full h-10 rounded-md p-2"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <p>Confirm your password</p>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className="border-gray-200 border-2 w-full h-10 rounded-md p-2"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-400 w-full p-2 rounded-md cursor-pointer">
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignInPage;
