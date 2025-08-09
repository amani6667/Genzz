import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { FaCopy, FaTimes, FaFacebookF, FaTwitter, FaTelegramPlane, FaWhatsapp, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { userData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [todayWins, setTodayWins] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const wins = Math.floor(Math.random() * 50) + 10;
    const amount = Math.floor(Math.random() * 50000) + 10000;
    setTodayWins({
      count: wins,
      amount: amount.toLocaleString()
    });
  }, []);

  const copyReferralLink = () => {
    const link = userData?.referralCode 
      ? `${base_url}/ref/${userData.referralCode}`
      : base_url;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = userData?.username 
    ? `Join with my referral on ${base_url} and get bonus! Use code: ${userData.referralCode}`
    : `Check out this amazing platform ${base_url}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(base_url)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(base_url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(base_url)}&text=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${base_url}`)}`
  };

  const InvitePopup = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center font-anek justify-center backdrop-blur-sm bg-black/50 p-4">
        <div className="bg-gray-800 text-white rounded-xl shadow-2xl max-w-5xl w-full relative border border-gray-700 overflow-hidden">
          <button 
            className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white text-lg z-10" 
            onClick={onClose}
          >
            <FaTimes />
          </button>
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-cyan-400">বন্ধুকে আমন্ত্রণ করুন</h3>
                <p className="text-gray-400 text-xs mt-1">আপনার বন্ধুদের আমন্ত্রণ করুন এবং বোনাস উপভোগ করুন</p>
              </div>
              
              {todayWins && (
                <div className="bg-gray-700/50 border border-cyan-400/30 rounded-lg px-3 py-1 text-center">
                  <p className="text-xs text-gray-300">আজকের রেফারেল জয়</p>
                  <p className="text-cyan-400 font-bold text-sm">{todayWins.count} জন</p>
                  <p className="text-xs text-green-400">৳{todayWins.amount} জিতেছে</p>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-xs mb-1">আপনার রেফারেল লিঙ্ক:</p>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white text-xs"
                      value={userData?.referralCode ? `${base_url}/ref/${userData.referralCode}` : base_url}
                      readOnly
                    />
                    <button 
                      onClick={copyReferralLink}
                      className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-2 py-2 rounded flex items-center gap-1 text-xs"
                    >
                      <FaCopy className="text-xs" /> {copied ? 'কপি হয়েছে!' : 'কপি'}
                    </button>
                  </div>
                  {!userData && (
                    <p className="text-xs text-gray-400 mt-1">লগইন করলে আপনার ব্যক্তিগত রেফারেল লিঙ্ক পাবেন</p>
                  )}
                </div>
                
                <div>
                  <p className="text-gray-300 text-xs mb-1">সোশ্যাল মিডিয়ায় শেয়ার করুন:</p>
                  <div className="flex gap-2">
                    <a 
                      href={shareLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors text-sm"
                    >
                      <FaFacebookF />
                    </a>
                    <a 
                      href={shareLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors text-sm"
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href={shareLinks.telegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors text-sm"
                    >
                      <FaTelegramPlane />
                    </a>
                    <a 
                      href={shareLinks.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors text-sm"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
                
                {userData && (
                  <div className="bg-gray-700/50 p-2 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-xs">আপনার আমন্ত্রিত বন্ধু</p>
                        <p className="text-cyan-400 font-bold text-sm">{userData.referrals || 0} জন</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">আপনার উপার্জন</p>
                        <p className="text-green-400 font-bold text-sm">৳{userData.referralEarnings || 0}</p>
                      </div>
                      <div className="bg-cyan-400/10 px-2 py-1 rounded-full text-cyan-400 text-xs flex items-center gap-1">
                        <FaUser className="text-xs" /> লেভেল {userData.referralLevel || 1}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 h-full">
                  <h4 className="font-medium mb-2 text-cyan-400 text-sm">আমন্ত্রণ নিয়ম ও পুরস্কার</h4>
                  <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1">
                    <li>প্রতিটি সফল আমন্ত্রণের জন্য আপনি <span className="text-green-400">50 টাকা বোনাস</span> পাবেন</li>
                    <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম <span className="text-amber-400">500 টাকা ডিপোজিট</span> করতে হবে</li>
                    <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম <span className="text-amber-400">3টি বেট</span> প্লেস করতে হবে</li>
                    <li>আপনার বন্ধুও পাবে <span className="text-green-400">20 টাকা বোনাস</span> তাদের প্রথম ডিপোজিটে</li>
                    <li>10+ রেফারেলে আপনি পাবেন <span className="text-purple-400">VIP লেভেল 1</span></li>
                    <li>50+ রেফারেলে আপনি পাবেন <span className="text-purple-400">VIP লেভেল 2</span> এবং অতিরিক্ত বোনাস</li>
                  </ul>
                  
                  <div className="mt-3 pt-2 border-t border-gray-600">
                    <h5 className="text-cyan-400 font-medium text-xs mb-1">রেফারেল টিয়ার সিস্টেম</h5>
                    <div className="grid grid-cols-3 gap-1 text-xxs">
                      <div className="bg-gray-600/50 p-1 rounded text-center">
                        <p className="text-xs">লেভেল 1</p>
                        <p className="text-green-400 text-xs">10% কমিশন</p>
                      </div>
                      <div className="bg-gray-600/50 p-1 rounded text-center">
                        <p className="text-xs">লেভেল 2</p>
                        <p className="text-green-400 text-xs">5% কমিশন</p>
                      </div>
                      <div className="bg-gray-600/50 p-1 rounded text-center">
                        <p className="text-xs">লেভেল 3</p>
                        <p className="text-green-400 text-xs">2% কমিশন</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen font-anek">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 px-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-1 rounded-full text-cyan-500 cursor-pointer hover:bg-gray-700 transition-colors"
          >
          <MdArrowBackIosNew/>
          </button>
          <h1 className="text-base font-bold text-gray-200">রেফারেল প্রোগ্রাম</h1>
        </div>
      </header>

      <div className="container mx-auto px-3 py-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-cyan-400">রেফারেল প্রোগ্রাম</h2>
              <p className="text-gray-400 text-xs">বন্ধুদের আমন্ত্রণ করুন এবং বোনাস উপার্জন করুন</p>
            </div>
            
            <button 
              onClick={() => setIsPopupOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-gray-900 font-bold py-1 px-4 rounded-lg text-sm transition duration-200"
            >
              বন্ধুকে আমন্ত্রণ করুন
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
              <p className="text-gray-400 text-xs">আপনার রেফারেল কোড</p>
              <p className="text-base font-bold text-cyan-400">{userData?.referralCode || 'N/A'}</p>
            </div>
            
            <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
              <p className="text-gray-400 text-xs">আপনার আমন্ত্রিত বন্ধু</p>
              <p className="text-base font-bold text-cyan-400">{userData?.referrals || 0} জন</p>
            </div>
            
            <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
              <p className="text-gray-400 text-xs">আপনার উপার্জন</p>
              <p className="text-base font-bold text-green-400">৳{userData?.referralEarnings || 0}</p>
            </div>
          </div>

          <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 mb-4">
            <h3 className="text-sm font-bold text-cyan-400 mb-2">আপনার রেফারেল লিঙ্ক</h3>
            <div className="flex items-center gap-1">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white text-xs"
                value={userData?.referralCode ? `${base_url}/ref/${userData.referralCode}` : base_url}
                readOnly
              />
              <button 
                onClick={copyReferralLink}
                className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-2 py-2 rounded flex items-center gap-1 text-xs"
              >
                <FaCopy className="text-xs" /> {copied ? 'কপি হয়েছে!' : 'কপি'}
              </button>
            </div>
            {!userData && (
              <p className="text-xxs text-gray-400 mt-1">লগইন করলে আপনার ব্যক্তিগত রেফারেল লিঙ্ক পাবেন</p>
            )}
          </div>

          <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
            <h3 className="text-sm font-bold text-cyan-400 mb-2">শেয়ার করুন</h3>
            <div className="flex gap-2">
              <a 
                href={shareLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors text-sm"
              >
                <FaFacebookF />
              </a>
              <a 
                href={shareLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors text-sm"
              >
                <FaTwitter />
              </a>
              <a 
                href={shareLinks.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors text-sm"
              >
                <FaTelegramPlane />
              </a>
              <a 
                href={shareLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors text-sm"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-3 border-b border-gray-700">
            <h3 className="font-bold text-sm text-gray-200">আপনার রেফারেল ইতিহাস</h3>
          </div>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700 text-gray-300">
                  <tr>
                    <th className="py-2 px-3 text-left text-xs">তারিখ</th>
                    <th className="py-2 px-3 text-left text-xs">ব্যবহারকারী</th>
                    <th className="py-2 px-3 text-left text-xs">স্ট্যাটাস</th>
                    <th className="py-2 px-3 text-left text-xs">আপনার উপার্জন</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500 text-xs">
                      <svg className="w-8 h-8 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-1">কোন রেফারেল ইতিহাস পাওয়া যায়নি</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && <InvitePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Referral;