import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SingInPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    console.log("soumis")
    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({email, password})
    })
        .then(data => data.json())
        .then(data => localStorage.setItem("token",data.token))
        .then(() => navigate("/Home"))
        .catch(err => console.error(err))
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form action="" className="flex flex-col w-1/4 h-2/3 shadow-xl m-auto items-center justify-around
             p-1/10 bg-gray-50 p-5 rounded-xl cursor-default" onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="bg-blue-400 p-7 rounded-sm">
                <p className="font-bold text-xl">→</p>
            </div>
            <div className="flex flex-col text-center pl-7 pr-7">
                <h1 className="text-2xl">Create your account</h1>
                <p>or <span className="text-blue-400 cursor-pointer"
                onClick={()=>{
                    navigate("/")
                }}>sign in to your existing account</span></p>
            </div>

                <div className="w-full">
                    <p>Email address</p>
                    <input type="text" placeholder="Entrer your email" 
                    className="border-gray-200 border-2 w-full h-10 rounded-md p-2"
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input type="password" placeholder="Entrer your password" 
                    className="border-gray-200 border-2 w-full h-10 rounded-md p-2"
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="w-full">
                    <p>Confirm your password</p>
                    <input type="password" placeholder="confirm your password" 
                    className="border-gray-200 border-2 w-full h-10 rounded-md p-2"
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="bg-blue-400 w-full p-2 rounded-md cursor-pointer">Sign in</button>
            </form>
        </div>
    )
}
export default SingInPage