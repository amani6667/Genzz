import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Invitefriends from './components/mobile/invite/invitefriends'
import Account from './components/mobile/acocunt/Account'
import Hotgames from './pages/games/Hotgames'
import Livegames from './pages/games/Livegames'
import Profile from './pages/profile/Profile'
import Deposit from './pages/deposit/Deposit'
import Withdraw from './pages/withdraw/Withdraw'
import Referel from './pages/refer/Referel'
const App = () => {
  return (
   <BrowserRouter>
     <Routes>
      <Route exact path="/"element={<Home/>}/>
      <Route exact path="/invite-friends"element={<Invitefriends/>}/>
      <Route exact path="/my-account"element={<Account/>}/>
      <Route exact path="/hot-games"element={<Hotgames/>}/>
      <Route exact path="/live-games"element={<Livegames/>}/>

      {/* ----------------after-login--------------------- */}
      <Route exact path="/profile"element={<Profile/>}/>
      <Route exact path="/deposit"element={<Deposit/>}/>
      <Route exact path="/withdraw"element={<Withdraw/>}/>
      <Route exact path="/refer-programme"element={<Referel/>}/>
       
      {/* ----------------after-login--------------------- */}
     </Routes>
   </BrowserRouter>
  )
}

export default App
