import './App.css'
import LoginPage from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingInPage from './pages/singIn'
import UserInterface from './pages/UserInterface'
import { AuthProvider } from './components/AuthProviderProps'
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/signIn' element={<SingInPage/>}></Route>
          <Route path='/Home' element={<UserInterface/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App