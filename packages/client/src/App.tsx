import './App.css'
import LoginPage from './pages/login'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SingInPage from './pages/singIn'
import UserInterface from './components/UserInterface'
import { AuthProvider } from './components/AuthProviderProps'
function App() {

  return (
    <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/signIn' element={<SingInPage/>}></Route>
          <Route path='/Home' element={<UserInterface/>}></Route>
        </Routes>
    </AuthProvider>
  )
}

export default App