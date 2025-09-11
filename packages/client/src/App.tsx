import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/Dashboard";
import {Expenses} from "./pages/Expenses";
import {Incomes} from "./pages/Incomes";
import {Categories} from "./pages/Categories";
import Profile from "./pages/Profile";
import { AuthProvider } from "./components/AuthProviderProps";
import { IncomeForm } from "./pages/IncomeForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes sans NavBar */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Routes avec NavBar grâce à Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/incomes/new" element={<IncomeForm/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
