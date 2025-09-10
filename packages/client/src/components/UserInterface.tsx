import { User, Settings, Mail, Calendar } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns"
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

function UserInterface() {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  return (
    <div className="h-full w-full flex flex-col space-y-8 p-10">
      <h1 className="font-bold text-4xl">Profile</h1>

      <div className="shadow-xl p-10 rounded-2xl space-y-6">
        <div className="flex flex-row items-center space-x-4">
          <User
            size={64}
            className="bg-blue-400 p-5 rounded-full"
            color="white"
          />
          <div className="flex flex-col justify-around">
            <h2 className="text-xl font-semibold">Account Information</h2>
            <p className="text-gray-400">Your account details and settings</p>
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail size={20} />
              <p className="text-gray-500">Email address</p>
            </div>
            <p className="text-lg text-center flex-1">
              {user?.email || "example@mail.com"}
            </p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar size={20} />
              <p className="text-gray-500">Member since</p>
            </div>
            <p className="text-lg text-center flex-1">
              {user?format(new Date(user.createdAt), "dd MMMM yyyy", { locale: fr }): "Jan 2025"}
            </p>
          </div>
        </div>
      </div>

      <div className="shadow-xl p-10 rounded-2xl space-y-4">
        <div className="flex flex-row items-center space-x-4">
          <Settings size={32} />
          <p className="text-lg font-semibold">Settings</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-gray-500">Change your account password</div>
          <button className="text-gray-600 rounded-md border-2 border-gray-400 px-3 py-1 hover:bg-gray-100 transition">
            Change password
          </button>
        </div>
      </div>

      <div className="shadow-xl p-10 rounded-2xl space-y-4">
        <h1 className="text-xl font-semibold">Account Action</h1>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <div>
            <h2 className="font-bold">Sign out</h2>
            <p className="text-gray-400">
              Sign out your account on this device
            </p>
          </div>
          <button className="border-2 border-red-500 px-4 py-2 text-red-500 rounded-md hover:bg-red-50 transition" onClick={()=>{
            logout()
            navigate("/")
          }}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInterface;
