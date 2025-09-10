import './App.css'
import LoginPage from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingInPage from './pages/singIn'
import UserInterface from './components/UserInterface'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/signIn' element={<SingInPage/>}></Route>
        <Route path='/Home' element={<UserInterface/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App