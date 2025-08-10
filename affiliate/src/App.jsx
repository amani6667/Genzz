import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/dashboard/Register'
import Login from './pages/dashboard/Login'
import Dashboard from './pages/dashboard/Dashbaord'
const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route exact path="/register"element={<Register/>}/>
        <Route exact path="/login"element={<Login/>}/>
        {/* --------------------------------after-login-all-pages------------------------- */}
        <Route exact path="/dashboard"element={<Dashboard/>}/>

      </Routes>
   </BrowserRouter>
  )
}

export default App
