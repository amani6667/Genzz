import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Invitefriends from './components/mobile/invite/invitefriends'
import Account from './components/mobile/acocunt/Account'
import Hotgames from './pages/games/Hotgames'
import Livegames from './pages/games/Livegames'
import Profile from './pages/profile/Profile'
import Deposit from './pages/deposit/Deposit'
import Withdraw from './pages/withdraw/Withdraw'
import Referel from './pages/refer/Referel'
import FAQ from './pages/faq/FAQ'
import Affiliateprogramme from './pages/affiliate/Affiliateprogramme'
import Vipclub from './pages/club/Vipclub'
import GameProviders from './components/provider/GameProviders'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Handle page load completion
    const handleLoad = () => {
      setIsLoading(false)
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      window.addEventListener('load', handleLoad)
      
      // Fallback timeout in case load event doesn't fire
      const timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 5000) // Max 5 seconds even if load doesn't complete

      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Custom loader component with Tailwind CSS
  const Loader = () => (
<div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-[1000000000]">
  <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
  
  <div className="relative flex flex-col items-center space-y-6 z-10">
    {/* Animated Genzz text with G in cyan and rest in white */}
    <div className="flex items-center">
      <span className="text-4xl font-bold">
        <span className="text-cyan-400">G</span>
        <span className="text-white">enzzz</span>
      </span>
      <span className="text-4xl font-bold text-cyan-400 animate-pulse">
        .<span className="delay-100">.</span><span className="delay-200">.</span>
      </span>
    </div>
    
    {/* Subtle pulsing glow */}
    <div className="absolute -inset-8 bg-cyan-400/10 rounded-xl animate-pulse blur-xl"></div>
  </div>
</div>
  )

  return (
    <BrowserRouter>
      {isLoading && <Loader />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/invite-friends" element={<Invitefriends />} />
        <Route exact path="/my-account" element={<Account />} />
        <Route exact path="/hot-games" element={<Hotgames />} />
        <Route exact path="/live-games" element={<Livegames />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/deposit" element={<Deposit />} />
        <Route exact path="/withdraw" element={<Withdraw />} />
        <Route exact path="/refer-programme" element={<Referel />} />
        {/* --------------------free-route---------------------- */}
        <Route exact path="/faq-policy" element={<FAQ />} />
        <Route exact path="/affiliate-programme" element={<Affiliateprogramme />} />
        <Route exact path="/vip-club" element={<Vipclub />} />
        <Route exact path="/provider" element={<GameProviders />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App