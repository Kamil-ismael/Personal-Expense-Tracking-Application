import './App.css'
import LoginPage from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingInPage from './pages/singIn'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/signIn' element={<SingInPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App