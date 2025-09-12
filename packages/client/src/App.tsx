import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/login";
import SignInPAge from "./pages/signIn";
import {Dashboard} from "./pages/Dashboard";
import {Expenses} from "./pages/Expenses";
import {Incomes} from "./pages/Incomes";
import {Categories} from "./pages/Categories";
import { AuthProvider } from "./components/AuthProviderProps";
import { IncomeForm } from "./pages/IncomeForm";
import { ExpenseForm } from "./pages/ExpensesForm";
import Profile from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      
        <Routes>
          {/* Routes sans NavBar */}
          <Route path="/" element={<Login />} />
          <Route path="/signIn" element={<SignInPAge />} />

          {/* Routes avec NavBar grâce à Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="profile" element={<Profile/>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/:id/edit" element={<ExpenseForm />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/incomes/new" element={<IncomeForm/>}></Route>
            <Route path="/incomes/:id/edit" element={<IncomeForm />} />
            <Route path="/expenses/new" element={<ExpenseForm/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
