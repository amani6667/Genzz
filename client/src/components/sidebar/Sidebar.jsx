import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaCopy,
  FaFire,
  FaUserFriends,
  FaGift,
  FaChartBar,
  FaMedal,
  FaFutbol,
  FaMoneyBillWave,
  FaHandHoldingHeart,
  FaGem,
  FaCrosshairs,
  FaBullseye,
  FaHandsHelping,
  FaFlag,
  FaGamepad,
  FaDownload,
  FaThLarge,
  FaHeadset,
  FaTimes,
  FaEye,
  FaQuestionCircle,
  FaStar,
  FaTrophy,
  FaBell,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown,
  FaFilter,
  FaSearch,
  FaCalendarAlt
} from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios"
import toast,{Toaster} from "react-hot-toast"
const menuItems = [
  { 
    icon: <FaFire className="text-orange-400" />, 
    label: 'গরম খেলা',
    path: '/hot-games' 
  },
  { 
    icon: <FaUserFriends className="text-blue-400" />, 
    label: 'বন্ধুর আমন্ত্রণ',
    leftTab: 'বন্ধুর আমন্ত্রণ করুন'
  },
  { 
    icon: <FaMedal className="text-yellow-400" />, 
    label: 'পুরস্কার কেন্দ্র',
    leftTab: 'পুরস্কার কেন্দ্র'
  },
  { 
    icon: <FaFutbol className="text-red-400" />, 
    label: 'লাইভ',
    path: '/live-games'  
  },
  { 
    icon: <FaBullseye className="text-red-500" />, 
    label: 'মিশন',
    leftTab: 'মিশন'
  },
  { 
    icon: <FaHandsHelping className="text-blue-300" />, 
    label: 'স্পোর্টস' 
  },
  { 
    icon: <FaFlag className="text-green-500" />, 
    label: 'বাংলা' 
  },
  { 
    icon: <FaHeadset className="text-teal-400" />, 
    label: 'গ্রাহক সেবা' 
  },
  { 
    icon: <FaQuestionCircle className="text-purple-400" />, 
    label: 'FAQ/নীতি' 
  },
];

const leftMenuItems = [
  'আমার অ্যাকাউন্ট',
  'ডিপোজিট',
  'উত্তোলন',
  'বেটিং রেকর্ড',
  'অ্যাকাউন্ট রেকর্ড',
  'লাভ ও ক্ষতি',
  'পুরস্কার কেন্দ্র',
  'বন্ধুর আমন্ত্রণ করুন',
  'মিশন',
  'অভ্যন্তরীণ বার্তা',
];

const Sidebar = ({ showPopup, setShowPopup, activeLeftTab, setActiveLeftTab }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSupport(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (item) => {
    if (item.label === 'বন্ধুর আমন্ত্রণ') {
      setShowInvitePopup(true);
    } else if (item.path) {
      navigate(item.path);
    } else {
      setSelectedMenu(item);
      if (item.leftTab) {
        setActiveLeftTab(item.leftTab);
      }
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowInvitePopup(false);
    setSelectedMenu(null);
  };

  return (
    <>
      <div className="bg-gray-900 w-[330px] h-full fixed top-[70px] overflow-y-auto no-scrollbar left-0 px-4 py-6">
        {/* Original Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <MenuCard key={index} item={item} onClick={() => handleMenuClick(item)} />
          ))}
        </div>
        
        {/* New Support Button (fixed at bottom) */}
        <div className={`fixed bottom-6 left-4 w-[calc(330px-32px)] transition-all duration-500 ease-in-out ${showSupport ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="border-[1px] border-gray-700 text-white rounded-lg p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-medium">সাপোর্ট</span>
              </div>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h4v4H8zm8 0h4v4h-4z" />
              </svg>
            </div>
            <p className="text-sm mt-1">আমাদের সাথে যোগাযোগ করুন</p>
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup
          onClose={handleClosePopup}
          selectedMenu={selectedMenu}
          activeLeftTab={activeLeftTab}
          setActiveLeftTab={setActiveLeftTab}
        />
      )}

      {showInvitePopup && (
        <InvitePopup onClose={handleClosePopup} />
      )}
    </>
  );
};

const MenuCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 border-[1px] border-gray-700 text-white rounded-[5px] p-4 flex flex-col items-center justify-center cursor-pointer"
  >
    <div className="text-2xl mb-2">{item.icon}</div>
    <div className="text-xs text-center leading-tight font-medium text-gray-300">{item.label}</div>
  </div>
);

const Popup = ({ onClose, selectedMenu, activeLeftTab, setActiveLeftTab }) => {
  const tabs = ['সারাংশ', 'পুরস্কার', 'আয়', 'রেফার', 'আমন্ত্রণ তালিকা'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="fixed top-0 left-0 inset-0 z-[100000000] w-full h-screen backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl overflow-hidden relative transition-all duration-300 transform border border-gray-700">
        <button 
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white text-[25px] z-10" 
          onClick={onClose}
        >
          <IoClose  />
        </button>

        <div className="flex h-full">
          <div className="w-64 bg-gray-800 text-white p-6 overflow-y-auto border-r border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-cyan-400">ব্যক্তিগত কেন্দ্র</h2>
            <ul className="space-y-4">
              {leftMenuItems.map((item, index) => (
                <li
                  key={index}
                  className={`py-2 px-3 rounded-md cursor-pointer transition-colors ${
                    item === activeLeftTab
                      ? 'bg-cyan-500 text-gray-900 font-semibold'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveLeftTab(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-900">
            {activeLeftTab === 'আমার অ্যাকাউন্ট' ? (
              <AccountTabContent />
            ) : activeLeftTab === 'ডিপোজিট' ? (
              <DepositTabContent />
            ) : activeLeftTab === 'উত্তোলন' ? (
              <WithdrawalTabContent />
            ) : activeLeftTab === 'বেটিং রেকর্ড' ? (
              <BettingRecordTabContent />
            ) : activeLeftTab === 'অ্যাকাউন্ট রেকর্ড' ? (
              <AccountRecordTabContent />
            ) : activeLeftTab === 'লাভ ও ক্ষতি' ? (
              <ProfitLossTabContent />
            ) : activeLeftTab === 'পুরস্কার কেন্দ্র' ? (
              <RewardCenterTabContent />
            ) : activeLeftTab === 'বন্ধুর আমন্ত্রণ করুন' ? (
              <InviteFriendTabContent />
            ) : activeLeftTab === 'মিশন' ? (
              <MissionTabContent />
            ) : activeLeftTab === 'অভ্যন্তরীণ বার্তা' ? (
              <InternalMessageTabContent />
            ) : (
              <DefaultTabContent activeLeftTab={activeLeftTab} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InvitePopup = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const { userData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [todayWins, setTodayWins] = useState(null);

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

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center backdrop-blur-sm bg-black/50 p-4">
      <div className="bg-gray-800 text-white rounded-xl shadow-2xl max-w-5xl w-full relative border border-gray-700 overflow-hidden">
        <button 
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white text-xl z-10" 
          onClick={onClose}
        >
          <FaTimes />
        </button>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400">বন্ধুকে আমন্ত্রণ করুন</h3>
              <p className="text-gray-400 mt-1">আপনার বন্ধুদের আমন্ত্রণ করুন এবং বোনাস উপভোগ করুন</p>
            </div>
            
            {todayWins && (
              <div className="bg-gray-700/50 border border-cyan-400/30 rounded-lg px-4 py-2 text-center">
                <p className="text-xs text-gray-300">আজকের রেফারেল জয়</p>
                <p className="text-cyan-400 font-bold">{todayWins.count} জন</p>
                <p className="text-xs text-green-400">৳{todayWins.amount} জিতেছে</p>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 mb-2">আপনার রেফারেল লিঙ্ক:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white text-sm"
                    value={userData?.referralCode ? `${base_url}/ref/${userData.referralCode}` : base_url}
                    readOnly
                  />
                  <button 
                    onClick={copyReferralLink}
                    className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-2 rounded flex items-center gap-1 text-sm"
                  >
                    <FaCopy /> {copied ? 'কপি হয়েছে!' : 'কপি করুন'}
                  </button>
                </div>
                {!userData && (
                  <p className="text-xs text-gray-400 mt-1">লগইন করলে আপনার ব্যক্তিগত রেফারেল লিঙ্ক পাবেন</p>
                )}
              </div>
              
              <div>
                <p className="text-gray-300 mb-2">সোশ্যাল মিডিয়ায় শেয়ার করুন:</p>
                <div className="flex gap-3">
                  <a 
                    href={shareLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                  >
                    <FaFacebookF />
                  </a>
                  <a 
                    href={shareLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href={shareLinks.telegram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
                  >
                    <FaTelegramPlane />
                  </a>
                  <a 
                    href={shareLinks.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
              
              {userData && (
                <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">আপনার আমন্ত্রিত বন্ধু</p>
                      <p className="text-cyan-400 font-bold">{userData.referrals || 0} জন</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">আপনার উপার্জন</p>
                      <p className="text-green-400 font-bold">৳{userData.referralEarnings || 0}</p>
                    </div>
                    <div className="bg-cyan-400/10 px-3 py-1 rounded-full text-cyan-400 text-sm flex items-center gap-1">
                      <FaUser /> লেভেল {userData.referralLevel || 1}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 h-full">
                <h4 className="font-medium mb-3 text-cyan-400 text-lg">আমন্ত্রণ নিয়ম ও পুরস্কার</h4>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
                  <li>প্রতিটি সফল আমন্ত্রণের জন্য আপনি <span className="text-green-400">50 টাকা বোনাস</span> পাবেন</li>
                  <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম <span className="text-amber-400">500 টাকা ডিপোজিট</span> করতে হবে</li>
                  <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম <span className="text-amber-400">3টি বেট</span> প্লেস করতে হবে</li>
                  <li>আপনার বন্ধুও পাবে <span className="text-green-400">20 টাকা বোনাস</span> তাদের প্রথম ডিপোজিটে</li>
                  <li>10+ রেফারেলে আপনি পাবেন <span className="text-purple-400">VIP লেভেল 1</span></li>
                  <li>50+ রেফারেলে আপনি পাবেন <span className="text-purple-400">VIP লেভেল 2</span> এবং অতিরিক্ত বোনাস</li>
                </ul>
                
                <div className="mt-4 pt-3 border-t border-gray-600">
                  <h5 className="text-cyan-400 font-medium mb-2">রেফারেল টিয়ার সিস্টেম</h5>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-600/50 p-2 rounded text-center">
                      <p>লেভেল 1</p>
                      <p className="text-green-400">10% কমিশন</p>
                    </div>
                    <div className="bg-gray-600/50 p-2 rounded text-center">
                      <p>লেভেল 2</p>
                      <p className="text-green-400">5% কমিশন</p>
                    </div>
                    <div className="bg-gray-600/50 p-2 rounded text-center">
                      <p>লেভেল 3</p>
                      <p className="text-green-400">2% কমিশন</p>
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

const AccountTabContent = () => {
  // State for password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);
  
  // State for password forms
  const [currentLoginPassword, setCurrentLoginPassword] = useState('');
  const [newLoginPassword, setNewLoginPassword] = useState('');
  const [confirmLoginPassword, setConfirmLoginPassword] = useState('');
  const [currentTransactionPassword, setCurrentTransactionPassword] = useState('');
  const [newTransactionPassword, setNewTransactionPassword] = useState('');
  const [confirmTransactionPassword, setConfirmTransactionPassword] = useState('');
  
  // State for mobile number form
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileTransactionPassword, setMobileTransactionPassword] = useState('');
  const [confirmMobileTransactionPassword, setConfirmMobileTransactionPassword] = useState('');

  // User data and loading states
  const { userData, loading, error, fetchUserData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // State for feedback messages
  const [feedback, setFeedback] = useState({
    type: '', // 'success' or 'error'
    message: '',
    field: '' // Which form the message belongs to
  });

  // State for showing mobile number alert
  const [showMobileAlert, setShowMobileAlert] = useState(false);
  const [alertContext, setAlertContext] = useState(''); // 'deposit' or 'withdraw'

  // State for history data
  const [depositHistory, setDepositHistory] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [betHistory, setBetHistory] = useState([]);
  const [referralHistory, setReferralHistory] = useState([]);

  // Tab management - Security tab moved to first position
  const tabs = ['নিরাপত্তা', 'পাসওয়ার্ড আপডেট', 'সারাংশ', 'পুরস্কার', 'আয়', 'রেফার', 'আমন্ত্রণ তালিকা'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  // Format date to Bengali
  const formatDateToBengali = (dateString) => {
    if (!dateString) return 'তারিখ পাওয়া যায়নি';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('bn-BD', options);
    
    // Convert English digits to Bengali
    return formattedDate.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
  };

  // Format mobile number to show first 4 and last 3 digits (in English numbers)
  const formatMobileNumber = (number) => {
    if (!number || number.length < 7) return number;
    const firstPart = number.substring(0, 4);
    const lastPart = number.substring(number.length - 3);
    return `${firstPart}****${lastPart}`;
  };

  // Show mobile number alert when trying to deposit/withdraw
  const checkMobileBeforeAction = (actionType) => {
    if (!userData?.phone) {
      setShowMobileAlert(true);
      setAlertContext(actionType);
      return false;
    }
    return true;
  };

  // Example functions that would trigger the mobile check
  const handleDepositClick = () => {
    if (checkMobileBeforeAction('deposit')) {
      // Proceed with deposit
      console.log('Proceeding with deposit');
    }
  };

  const handleWithdrawClick = () => {
    if (checkMobileBeforeAction('withdraw')) {
      // Proceed with withdrawal
      console.log('Proceeding with withdrawal');
    }
  };

  // Load history data when tab changes
  useEffect(() => {
    if (selectedTab === 'সারাংশ') {
      fetchBetHistory();
    } else if (selectedTab === 'পুরস্কার') {
      fetchReferralHistory();
    } else if (selectedTab === 'আয়') {
      fetchDepositHistory();
    } else if (selectedTab === 'রেফার') {
      fetchReferralHistory();
    }
  }, [selectedTab]);

  // Fetch deposit history with Axios
  const fetchDepositHistory = async () => {
    try {
      const response = await axios.get(`${base_url}/user/deposit-history/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDepositHistory(response.data.data);
    } catch (err) {
      console.error('Failed to fetch deposit history:', err);
    }
  };

  // Fetch withdrawal history with Axios
  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(`${base_url}/user/withdrawal-history/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWithdrawalHistory(response.data.data);
    } catch (err) {
      console.error('Failed to fetch withdrawal history:', err);
    }
  };

  // Fetch bet history with Axios
  const fetchBetHistory = async () => {
    try {
      const response = await axios.get(`${base_url}/user/bet-history/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBetHistory(response.data.data);
    } catch (err) {
      console.error('Failed to fetch bet history:', err);
    }
  };

  // Fetch referral history with Axios
  const fetchReferralHistory = async () => {
    try {
      const response = await axios.get(`${base_url}/user/referral-history/${userData._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReferralHistory(response.data.data.referredUsers || []);
    } catch (err) {
      console.error('Failed to fetch referral history:', err);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${base_url}/ref/${userData?.referralCode || 't4590050297'}`;
    navigator.clipboard.writeText(referralLink);
    setFeedback({
      type: 'success',
      message: 'রেফারেল লিঙ্ক কপি করা হয়েছে!',
      field: 'referral'
    });
  };

  const handleAddMobile = async (e) => {
    if (e) e.preventDefault();
    
    // Validation
    if (!/^[0-9]{10,15}$/.test(mobileNumber)) {
      setFeedback({
        type: 'error',
        message: 'অবৈধ মোবাইল নম্বর ফরম্যাট (১০-১৫ ডিজিট প্রয়োজন)',
        field: 'mobile'
      });
      return;
    }

    if (mobileTransactionPassword !== confirmMobileTransactionPassword) {
      setFeedback({
        type: 'error',
        message: 'লেনদেন পাসওয়ার্ড এবং নিশ্চিতকরণ মেলে না',
        field: 'mobile'
      });
      return;
    }

    try {
      const response = await axios.post(`${base_url}/user/add-mobile`, {
        userId: userData._id,
        mobileNumber,
        transactionPassword: mobileTransactionPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFeedback({
        type: 'success',
        message: 'মোবাইল নম্বর এবং লেনদেন পাসওয়ার্ড সফলভাবে যোগ করা হয়েছে!',
        field: 'mobile'
      });

      // Reset form
      setMobileNumber('');
      setMobileTransactionPassword('');
      setConfirmMobileTransactionPassword('');

      // Close alert if it was open
      setShowMobileAlert(false);

      // Refresh user data
      fetchUserData();

    } catch (err) {
      console.log(err)
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'মোবাইল নম্বর যোগ করতে ব্যর্থ হয়েছে',
        field: 'mobile'
      });
    }
  };

  const handleLoginPasswordChange = async (e) => {
    e.preventDefault();
    
    // Validation
    if (newLoginPassword !== confirmLoginPassword) {
      setFeedback({
        type: 'error',
        message: 'নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ মেলে না',
        field: 'loginPassword'
      });
      return;
    }

    try {
      const response = await axios.put(`${base_url}/update-account-password`, {
        userId: userData._id,
        currentPassword: currentLoginPassword,
        newPassword: newLoginPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFeedback({
        type: 'success',
        message: 'লগইন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!',
        field: 'loginPassword'
      });

      // Reset form
      setCurrentLoginPassword('');
      setNewLoginPassword('');
      setConfirmLoginPassword('');

      // Refresh user data
      fetchUserData();

    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে',
        field: 'loginPassword'
      });
    }
  };

  const handleTransactionPasswordChange = async (e) => {
    e.preventDefault();
    
    // Validation
    if (newTransactionPassword !== confirmTransactionPassword) {
      setFeedback({
        type: 'error',
        message: 'নতুন লেনদেন পাসওয়ার্ড এবং নিশ্চিতকরণ মেলে না',
        field: 'transactionPassword'
      });
      return;
    }

    try {
      const response = await axios.put(`${base_url}/update-transaction-password`, {
        userId: userData._id,
        currentPassword: currentTransactionPassword,
        newPassword: newTransactionPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFeedback({
        type: 'success',
        message: 'লেনদেন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!',
        field: 'transactionPassword'
      });

      // Reset form
      setCurrentTransactionPassword('');
      setNewTransactionPassword('');
      setConfirmTransactionPassword('');

      // Refresh user data
      fetchUserData();

    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'লেনদেন পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে',
        field: 'transactionPassword'
      });
    }
  };

  if (loading) return <div className="text-white text-center py-8">লোড হচ্ছে...</div>;
  if (error) return <div className="text-center py-8 text-red-500">ত্রুটি: {error}</div>;

  return (
    <div className="text-white">
      {/* Mobile Number Alert Modal */}
      {showMobileAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full border border-cyan-500">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">মোবাইল নম্বর প্রয়োজন</h3>
            <p className="mb-4">আপনাকে {alertContext === 'deposit' ? 'ডিপোজিট করতে' : 'উইথড্র করতে'} আপনার মোবাইল নম্বর যোগ করতে হবে।</p>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">মোবাইল নম্বর</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="01688XXXXXXXX"
                maxLength={15}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">লেনদেন পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={showTransactionPassword ? "text" : "password"}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                  value={mobileTransactionPassword}
                  onChange={(e) => setMobileTransactionPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                >
                  {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <input
                  type={showTransactionPassword ? "text" : "password"}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                  value={confirmMobileTransactionPassword}
                  onChange={(e) => setConfirmMobileTransactionPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                >
                  {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowMobileAlert(false)}
                className="px-4 py-2 bg-gray-700 rounded text-sm"
              >
                বাতিল
              </button>
              <button
                onClick={handleAddMobile}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-900 rounded text-sm"
              >
                মোবাইল সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback messages */}
      {feedback.message && (
        <div className={`mb-4 p-3 rounded ${feedback.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
          {feedback.message}
          <button 
            onClick={() => setFeedback({ type: '', message: '', field: '' })}
            className="float-right font-bold"
          >
            &times;
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Profile Info */}
        <div className="bg-gray-800 p-4 rounded-lg shadow col-span-1 border border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={userData?.avatar || "https://i.ibb.co/k6pqKkL/avatar.jpg"}
              alt="User"
              className="w-14 h-14 rounded-full border-2 border-cyan-400"
            />
            <div>
              <p className="text-sm font-semibold">{userData?.username || 't4590050297'}</p>
              <p className="text-xs text-gray-400">
                যোগদান করেছেন: {formatDateToBengali(userData?.createdAt) || '২০২৫-০৭-২৭'}
              </p>
            </div>
          </div>
          <div className="mt-4 text-xl font-bold text-cyan-400">
            ৳ {userData?.balance?.toLocaleString('bn-BD') || '০.০০'}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>{userData?.depositHistory?.length || 0} সক্রিয় ডিপোজিট অনুরোধ</li>
            <li>{userData?.withdrawHistory?.length || 0} সক্রিয় উত্তোলন অনুরোধ</li>
          </ul>
        </div>
      </div>

      <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              selectedTab === tab
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-cyan-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {selectedTab === 'নিরাপত্তা' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">অ্যাকাউন্ট নিরাপত্তা</h3>
          
          {/* Mobile Number Section */}
          <div className="bg-gray-700 p-4 rounded shadow mb-6 border border-gray-600">
            <h4 className="font-medium mb-4 text-cyan-400">মোবাইল নম্বর</h4>
            {userData?.phone ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">আপনার মোবাইল নম্বর</p>
                  <p className="text-white">{formatMobileNumber(userData.phone)}</p>
                </div>
                <span className="text-green-500 text-sm">যাচাইকৃত</span>
              </div>
            ) : (
              <>
                {feedback.field === 'mobile' && (
                  <div className={`mb-3 p-2 rounded text-sm ${
                    feedback.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
                  }`}>
                    {feedback.message}
                  </div>
                )}
                <p className="text-sm text-yellow-500 mb-4">লেনদেনের জন্য আপনাকে আপনার মোবাইল নম্বর যোগ করতে হবে</p>
                <form onSubmit={handleAddMobile}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">মোবাইল নম্বর</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="01688XXXXXXXX"
                        maxLength={15}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">লেনদেন পাসওয়ার্ড</label>
                      <div className="relative">
                        <input
                          type={showTransactionPassword ? "text" : "password"}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                          value={mobileTransactionPassword}
                          onChange={(e) => setMobileTransactionPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                          onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                        >
                          {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                      <div className="relative">
                        <input
                          type={showTransactionPassword ? "text" : "password"}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                          value={confirmMobileTransactionPassword}
                          onChange={(e) => setConfirmMobileTransactionPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                          onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                        >
                          {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded text-sm"
                  >
                    মোবাইল নম্বর যোগ করুন
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {selectedTab === 'পাসওয়ার্ড আপডেট' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">পাসওয়ার্ড আপডেট করুন</h3>
          
          {/* Login Password Change */}
          <div className="bg-gray-700 p-4 rounded shadow mb-6 border border-gray-600">
            <h4 className="font-medium mb-4 text-cyan-400">লগইন পাসওয়ার্ড পরিবর্তন করুন</h4>
            {feedback.field === 'loginPassword' && (
              <div className={`mb-3 p-2 rounded text-sm ${
                feedback.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
              }`}>
                {feedback.message}
              </div>
            )}
            <form onSubmit={handleLoginPasswordChange}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">বর্তমান পাসওয়ার্ড</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                      value={currentLoginPassword}
                      onChange={(e) => setCurrentLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">নতুন পাসওয়ার্ড</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                      value={newLoginPassword}
                      onChange={(e) => setNewLoginPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                      value={confirmLoginPassword}
                      onChange={(e) => setConfirmLoginPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded text-sm"
              >
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </form>
          </div>

          {/* Transaction Password Change */}
          {userData?.phone && (
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <h4 className="font-medium mb-4 text-cyan-400">লেনদেন পাসওয়ার্ড পরিবর্তন করুন</h4>
              {feedback.field === 'transactionPassword' && (
                <div className={`mb-3 p-2 rounded text-sm ${
                  feedback.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
                }`}>
                  {feedback.message}
                </div>
              )}
              <form onSubmit={handleTransactionPasswordChange}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">বর্তমান লেনদেন পাসওয়ার্ড</label>
                    <div className="relative">
                      <input
                        type={showTransactionPassword ? "text" : "password"}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                        value={currentTransactionPassword}
                        onChange={(e) => setCurrentTransactionPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                        onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                      >
                        {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">নতুন লেনদেন পাসওয়ার্ড</label>
                    <div className="relative">
                      <input
                        type={showTransactionPassword ? "text" : "password"}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                        value={newTransactionPassword}
                        onChange={(e) => setNewTransactionPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                        onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                      >
                        {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <div className="relative">
                      <input
                        type={showTransactionPassword ? "text" : "password"}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                        value={confirmTransactionPassword}
                        onChange={(e) => setConfirmTransactionPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-300"
                        onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                      >
                        {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded text-sm"
                >
                  লেনদেন পাসওয়ার্ড পরিবর্তন করুন
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Other tabs remain the same as before */}
      {selectedTab === 'সারাংশ' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">অ্যাকাউন্ট সারাংশ</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">মোট ব্যালেন্স</p>
              <p className="text-xl font-bold text-cyan-400">৳ {userData?.balance?.toLocaleString('bn-BD') || '০.০০'}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">বোনাস</p>
              <p className="text-xl font-bold text-cyan-400">৳ {userData?.bonus?.toLocaleString('bn-BD') || '০.০০'}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">লকড</p>
              <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">সাম্প্রতিক লেনদেন</h4>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              {betHistory.length > 0 ? (
                <ul>
                  {betHistory.slice(0, 5).map((bet, index) => (
                    <li key={index} className="py-2 border-b border-gray-600 last:border-b-0">
                      <div className="flex justify-between">
                        <span>{bet.game}</span>
                        <span className={`font-medium ${
                          bet.result === 'win' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {bet.result === 'win' ? '+' : '-'}৳{bet.amount}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {formatDateToBengali(bet.createdAt)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-4">কোন লেনদেন পাওয়া যায়নি</p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'পুরস্কার' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">আপনার পুরস্কার</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">উপলব্ধ বোনাস</p>
              <p className="text-xl font-bold text-cyan-400">৳ {userData?.bonus?.toLocaleString('bn-BD') || '০.০০'}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">মোট পুরস্কার</p>
              <p className="text-xl font-bold text-cyan-400">৳ {userData?.referralEarnings?.toLocaleString('bn-BD') || '০.০০'}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">পুরস্কার ইতিহাস</h4>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-center text-gray-500 py-4">কোন পুরস্কার ইতিহাস পাওয়া যায়নি</p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'আয়' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">আয়ের বিবরণ</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">আজকের আয়</p>
              <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">গতকালের আয়</p>
              <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">এই মাসের আয়</p>
              <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">আয়ের ইতিহাস</h4>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              {depositHistory.length > 0 ? (
                <ul>
                  {depositHistory.slice(0, 5).map((deposit, index) => (
                    <li key={index} className="py-2 border-b border-gray-600 last:border-b-0">
                      <div className="flex justify-between">
                        <span>{deposit.payment_method}</span>
                        <span className="text-green-400 font-medium">+৳{deposit.amount}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {formatDateToBengali(deposit.date)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-4">কোন আয়ের ইতিহাস পাওয়া যায়নি</p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'রেফার' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">রেফারেল তথ্য</h3>
          <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">আপনার রেফারেল লিঙ্ক</p>
                <p className="text-cyan-400">{`${base_url}/ref/${userData?.referralCode}`}</p>
              </div>
              <button 
                onClick={copyReferralLink}
                className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                <FaCopy /> কপি করুন
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">মোট রেফারেল</p>
              <p className="text-xl font-bold text-cyan-400">{userData?.referralCount || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">সক্রিয় রেফারেল</p>
              <p className="text-xl font-bold text-cyan-400">{referralHistory.filter(u => u.status === 'active').length || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
              <p className="text-sm text-gray-400">রেফারেল বোনাস</p>
              <p className="text-xl font-bold text-cyan-400">৳ {userData?.referralEarnings?.toLocaleString('bn-BD') || '০.০০'}</p>
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
            <h4 className="font-medium mb-2">সোশ্যাল মিডিয়ায় শেয়ার করুন</h4>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                <FaFacebookF />
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors">
                <FaTwitter />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                <FaTelegramPlane />
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors">
                <FaWhatsapp />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'আমন্ত্রণ তালিকা' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">আপনার আমন্ত্রিত বন্ধুদের তালিকা</h3>
          <div className="bg-gray-700 rounded shadow border border-gray-600">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">ব্যবহারকারীর নাম</th>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">যোগদানের তারিখ</th>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পুরস্কার</th>
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.length > 0 ? (
                    referralHistory.map((user, index) => (
                      <tr key={index} className="border-b border-gray-600 last:border-b-0">
                        <td className="py-2 px-4">{user.username}</td>
                        <td className="py-2 px-4">{formatDateToBengali(user.createdAt)}</td>
                        <td className="py-2 px-4">{user.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</td>
                        <td className="py-2 px-4">৳ {user.earned?.toLocaleString('bn-BD') || '০.০০'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 text-center text-gray-500">
                        কোন আমন্ত্রিত বন্ধু পাওয়া যায়নি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};





const DepositTabContent = () => {
  const [amount, setAmount] = useState('');
  const [activeProvider, setActiveProvider] = useState('bkash');
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, loading, error, fetchUserData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const amounts = [300, 500, 1000, 3000, 5000, 10000, 20000, 25000, 30000];
  
  // State for error/success messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if user has mobile number
  const hasMobileNumber = userData?.phone;

  const handleDeposit = async () => {
    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');

  // Validate inputs
if (!amount) {
  setErrorMessage('অনুগ্রহ করে একটি অর্থের পরিমাণ লিখুন');
  return;
}

const amountNum = parseFloat(amount);
if (isNaN(amountNum)) {
  setErrorMessage('অনুগ্রহ করে একটি বৈধ অর্থের পরিমাণ লিখুন');
  return;
}

if (amountNum < 300) {
  setErrorMessage('ন্যূনতম জমার পরিমাণ ৩০০ টাকা');
  return;
}

if (amountNum > 30000) {
  setErrorMessage('সর্বোচ্চ জমার পরিমাণ ৩০,০০০ টাকা');
  return;
}

if (!userData?.phone) {
  setErrorMessage('অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে একটি মোবাইল নম্বর যোগ করুন');
  return;
}

// Text validation - check if amount contains only numbers
if (!/^\d+$/.test(amount)) {
  setErrorMessage('অর্থের পরিমাণ শুধুমাত্র সংখ্যা হতে হবে');
  return;
}

    setIsSubmitting(true);

    try {
      const payload = {
        provider: selectedMethod,
        amount: amountNum,
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        currency: 'BDT',
        payerId: userData.id || 'N/A',
        redirectUrl: `${window.location.origin}/deposit-success`,
        callbackUrl: `${base_url}/api/payment/callback`
      };

      const response = await axios.post(
        'https://api.nagodpay.com/api/payment/payment',
        payload,
        {
          headers: {
            'x-api-key': import.meta.env.VITE_NAGODPAY_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.paymentUrl) {
        setSuccessMessage('Payment initiated successfully! Redirecting...');
        window.location.href = response.data.paymentUrl;
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Deposit error:', error);
      setErrorMessage(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error loading user data</div>;
  }

  if (!hasMobileNumber) {
    return (
      <div className="p-6 rounded-lg max-w-2xl mx-auto text-center">
        <div className="p-4 rounded mb-4">
          <h3 className="font-bold text-lg">দয়া করে মোবাইল নাম্বার যোগ করুন</h3>
          <p className="mt-2">ডিপোজিট করার জন্য আপনাকে প্রথমে অ্যাকাউন্ট একটি মোবাইল নাম্বার যোগ করতে হবে</p>
        </div>
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-2 px-6 rounded text-lg"
          onClick={() => {
            // Redirect to profile page
            window.location.href = '/profile';
          }}
        >
          অ্যাকাউন্ট এডিট করুন
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700 max-w-6xl mx-auto">
      {/* LEFT SIDE: Payment Method Tabs */}
      <div className="w-full md:w-1/4 bg-gray-700 border border-gray-600 rounded p-3 space-y-3">
        <div
          className={`flex items-center p-2 rounded cursor-pointer border ${
            activeProvider === 'bkash' ? 'bg-cyan-500 border-cyan-500 text-gray-900' : 'bg-gray-800 border-gray-600'
          }`}
          onClick={() => {
            setActiveProvider('bkash');
            setSelectedMethod('bkash');
          }}
        >
          <img
            src="https://images.5949390294.com/mcs-images/bank_type/BKASH/BN_2_20240312225413337.png"
            alt="bkash"
            className="w-8 h-8 mr-2"
          />
          <span className="font-medium">Bkash VIP</span>
        </div>

        <div
          className={`flex items-center p-2 rounded cursor-pointer border ${
            activeProvider === 'nagad' ? 'bg-cyan-500 border-cyan-500 text-gray-900' : 'bg-gray-800 border-gray-600'
          }`}
          onClick={() => {
            setActiveProvider('nagad');
            setSelectedMethod('nagad');
          }}
        >
          <img
            src="https://images.5949390294.com/mcs-images/bank_type/NAGAD/BN_2_20240312230148421.png"
            alt="nagad"
            className="w-8 h-8 mr-2"
          />
          <span className="font-medium">Nagad VIP</span>
        </div>
      </div>

      {/* RIGHT SIDE: Deposit Form */}
      <div className="w-full md:w-3/4">
        {/* Top Warning */}
        <div className="bg-gray-700 border border-cyan-500 text-cyan-400 p-3 rounded mb-4 text-sm">
          ❗❗ NOTE : অনুগ্রহ করে আপনার ডিপোজিট করার পরে অবশ্যই আপনার Trx-ID আইডি সাবমিট করবেন। <br />
          তাহলে খুব দ্রুত আপনার একাউন্টের মধ্যে টাকা যোগ হয়ে যাবে। ⚠️⚠️⚠️
        </div>

        {/* Error/Success Messages */}
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-500 p-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Sub-tabs (Only if Bkash Selected) */}
        {/* {activeProvider === 'bkash' && (
          <div className="flex flex-wrap gap-2 mb-4">
            {['ALO', 'SOO', 'G1P', 'LCK', 'SKP'].map((label) => (
              <div
                key={label}
                className={`px-3 py-1 border rounded cursor-pointer ${
                  label === 'ALO' ? 'bg-cyan-500 border-cyan-500 text-gray-900' : 'bg-gray-800 border-gray-600'
                }`}
              >
                Bkash VIP | {label}
              </div>
            ))}
          </div>
        )} */}

        {/* Black Warning */}
        {/* <div className="bg-gray-800 border border-cyan-500 text-cyan-400 p-3 rounded text-sm mb-4">
          ⚠️ অনুগ্রহ করে সতর্ক থাকুন (যে সমস্ত ডিপোজিট পদ্ধতির প্রদানের জন্য Telegram বা Facebook এর মাধ্যমে দাবি করছে
          তারা অনেক ফ্যাকার এসেছে। আমাদের অফিসিয়াল ডিপোজিটগুলো শুধুমাত্র প্ল্যাটফর্মের মধ্যে সম্পন্ন হয়।)
        </div> */}

        {/* Deposit Amount Buttons */}
        <div className="mb-4">
          <label className="block font-medium mb-2">জমার পরিমাণ:</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-2">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(amt.toString());
                  setErrorMessage(''); // Clear error when selecting an amount
                }}
                className={`bg-gray-700 hover:bg-cyan-500 hover:text-gray-900 px-2 py-1 rounded text-sm text-center border ${
                  amount === amt.toString() ? 'border-cyan-500' : 'border-gray-600'
                }`}
              >
                {amt.toLocaleString()} ৳
              </button>
            ))}
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers and empty string
              if (value === '' || /^\d+$/.test(value)) {
                setAmount(value);
                setErrorMessage(''); // Clear error when typing
              }
            }}
            className="mt-3 w-full p-2 border border-gray-600 rounded text-sm bg-gray-800 text-white"
            placeholder="জমার পরিমাণ লিখুন"
            min="300"
            max="30000"
          />
          <p className="text-sm text-gray-400 mt-1">
            সর্বনিম্ন পরিমাণ: ৳ 300, সর্বাধিক পরিমাণ: ৳ 30,000 <br />
            জমার সময়: 24/24
          </p>
        </div>

        {/* Payment Method Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-2">প্রদান পদ্ধতি নির্বাচন করুন:</label>
          <select
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-2 px-4 rounded w-full text-lg"
          onClick={handleDeposit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'জমার জন্য আবেদন করুন'}
        </button>

        {/* Deposit History */}
        <div className="bg-gray-700 p-4 mt-6 rounded border border-gray-600">
          <h4 className="font-medium mb-3">ডিপোজিট ইতিহাস</h4>
          <table className="w-full text-sm border border-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4 text-left border-b border-gray-600">তারিখ</th>
                <th className="py-2 px-4 text-left border-b border-gray-600">পরিমাণ</th>
                <th className="py-2 px-4 text-left border-b border-gray-600">পদ্ধতি</th>
                <th className="py-2 px-4 text-left border-b border-gray-600">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  কোন ডিপোজিট ইতিহাস পাওয়া যায়নি
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const WithdrawalTabContent = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { userData, loading: userLoading, error: userError, fetchUserData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Check if user has mobile number
  const hasMobileNumber = userData?.phone;

  const handleWithdrawal = async () => {
    setError('');
    setSuccess('');
    
    // Validation
    if (!amount || amount < 500) {
      setError('ন্যূনতম উত্তোলন পরিমাণ ৳ ৫০০');
      return;
    }
    
    if (!accountNumber) {
      setError('অ্যাকাউন্ট নম্বর দিন');
      return;
    }
    
    if (paymentMethod === 'bkash' && !/^01\d{9}$/.test(accountNumber)) {
      setError('অবৈধ bKash নম্বর ফরম্যাট (01XXXXXXXXX)');
      return;
    }
    
    if (paymentMethod === 'nagad' && !/^01\d{9}$/.test(accountNumber)) {
      setError('অবৈধ Nagad নম্বর ফরম্যাট (01XXXXXXXXX)');
      return;
    }
    
    if (paymentMethod === 'rocket' && !/^01\d{9}$/.test(accountNumber)) {
      setError('অবৈধ Rocket নম্বর ফরম্যাট (01XXXXXXXXX)');
      return;
    }

    try {
      setLoading(true);
      
      const orderId = `WD${Date.now()}${Math.floor(Math.random() * 1000)}`;
      
      const payload = {
        provider: paymentMethod,
        orderId: orderId,
        payeeId: userData.id, // Assuming userData has an id field
        payeeAccount: accountNumber,
        callbackUrl: `${window.location.origin}/withdrawal-callback`,
        amount: parseFloat(amount).toFixed(2),
        currency: "BDT"
      };

      const response = await axios.post(`${base_url}/api/payment/payout`, payload, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY, // Make sure to set this in your .env
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSuccess('উত্তোলন অনুরোধ সফলভাবে জমা হয়েছে। এটি প্রসেস হতে কিছু সময় লাগতে পারে।');
        // Reset form
        setAmount('');
        setAccountNumber('');
      } else {
        setError('উত্তোলন অনুরোধ ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('Withdrawal error:', err);
      if (err.response) {
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('সার্ভার থেকে একটি ত্রুটি ঘটেছে। দয়া করে পরে আবার চেষ্টা করুন।');
        }
      } else {
        setError('নেটওয়ার্ক ত্রুটি ঘটেছে। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।');
      }
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return <div className="text-center py-4">লোড হচ্ছে...</div>;
  }

  if (userError) {
    return <div className="text-center py-4 text-red-500">ব্যবহারকারী ডেটা লোড করতে সমস্যা হয়েছে</div>;
  }

  if (!hasMobileNumber) {
    return (
      <div className="p-6 rounded-lg max-w-2xl mx-auto text-center">
        <div className="p-4 rounded mb-4">
          <h3 className="font-bold text-lg">দয়া করে মোবাইল নাম্বার যোগ করুন</h3>
          <p className="mt-2">উত্তোলন করার জন্য আপনাকে প্রথমে অ্যাকাউন্ট একটি মোবাইল নাম্বার যোগ করতে হবে</p>
        </div>
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-2 px-6 rounded text-lg"
          onClick={() => {
            // Redirect to profile page or open modal to add phone number
            // Implement your navigation logic here
          }}
        >
          অ্যাকাউন্ট এডিট করুন
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">উত্তোলন</h3>
      
      {/* Warning Message */}
      <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 p-3 rounded mb-4 text-sm">
        ⚠️ উত্তোলনের ন্যূনতম পরিমাণ: ৳ 500 | উত্তোলনের সময়: সকাল ১০টা থেকে রাত ১০টা পর্যন্ত
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">
          ❌ {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">
          ✅ {success}
        </div>
      )}

      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">পেমেন্ট মেথড</label>
          <select
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
            <option value="bank">ব্যাংক ট্রান্সফার</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">অ্যাকাউন্ট নম্বর</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            placeholder="আপনার অ্যাকাউন্ট নম্বর লিখুন"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          {paymentMethod === 'bkash' && (
            <p className="text-xs text-gray-400 mt-1">bKash নাম্বার ফরম্যাট: 01XXXXXXXXX</p>
          )}
          {paymentMethod === 'nagad' && (
            <p className="text-xs text-gray-400 mt-1">Nagad নাম্বার ফরম্যাট: 01XXXXXXXXX</p>
          )}
          {paymentMethod === 'rocket' && (
            <p className="text-xs text-gray-400 mt-1">Rocket নাম্বার ফরম্যাট: 01XXXXXXXXX</p>
          )}
          {paymentMethod === 'bank' && (
            <p className="text-xs text-gray-400 mt-1">ব্যাংক অ্যাকাউন্ট নম্বর দিন</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">পরিমাণ (৳)</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            placeholder="উত্তোলন পরিমাণ লিখুন"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="500"
          />
          <p className="text-xs text-gray-400 mt-1">ন্যূনতম উত্তোলন পরিমাণ: ৳ 500</p>
        </div>
        
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={handleWithdrawal}
          disabled={!amount || amount < 500 || !accountNumber || loading}
        >
          {loading ? 'প্রসেস হচ্ছে...' : 'অনুরোধ করুন'}
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
        <h4 className="font-medium mb-2">উত্তোলন ইতিহাস</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পরিমাণ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পদ্ধতি</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  কোন উত্তোলন ইতিহাস পাওয়া যায়নি
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const BettingRecordTabContent = () => {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">বেটিং রেকর্ড</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'today' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('today')}
          >
            আজ
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'yesterday' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('yesterday')}
          >
            গতকাল
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'week' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('week')}
          >
            এই সপ্তাহ
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'month' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('month')}
          >
            এই মাস
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">বেট ID</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">বেট পরিমাণ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">লাভ/ক্ষতি</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  কোন বেটিং রেকর্ড পাওয়া যায়নি
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AccountRecordTabContent = () => {
  const [recordType, setRecordType] = useState('all');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">অ্যাকাউন্ট রেকর্ড</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${recordType === 'all' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setRecordType('all')}
          >
            সব
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${recordType === 'deposit' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setRecordType('deposit')}
          >
            ডিপোজিট
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${recordType === 'withdrawal' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setRecordType('withdrawal')}
          >
            উত্তোলন
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${recordType === 'bonus' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setRecordType('bonus')}
          >
            বোনাস
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">ধরণ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পরিমাণ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">ব্যালেন্স</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">বিবরণ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  কোন অ্যাকাউন্ট রেকর্ড পাওয়া যায়নি
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProfitLossTabContent = () => {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">লাভ ও ক্ষতি</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
          <p className="text-sm text-gray-400">আজকের লাভ/ক্ষতি</p>
          <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
        </div>
        <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
          <p className="text-sm text-gray-400">গতকালের লাভ/ক্ষতি</p>
          <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
        </div>
        <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
          <p className="text-sm text-gray-400">এই মাসের লাভ/ক্ষতি</p>
          <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'today' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('today')}
          >
            আজ
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'yesterday' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('yesterday')}
          >
            গতকাল
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'week' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('week')}
          >
            এই সপ্তাহ
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${timeRange === 'month' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setTimeRange('month')}
          >
            এই মাস
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">বেট পরিমাণ</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">জয়/হার</th>
                <th className="py-2 px-4 text-left text-sm border-b border-gray-600">লাভ/ক্ষতি</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  কোন লাভ/ক্ষতির রেকর্ড পাওয়া যায়নি
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RewardCenterTabContent = () => {
  const [activeTab, setActiveTab] = useState('available');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">পুরস্কার কেন্দ্র</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'available' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('available')}
          >
            উপলব্ধ পুরস্কার
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'claimed' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('claimed')}
          >
            দাবিকৃত পুরস্কার
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'history' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('history')}
          >
            পুরস্কার ইতিহাস
          </button>
        </div>
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">সাইন আপ বোনাস</h4>
                  <span className="bg-cyan-500 text-gray-900 text-xs px-2 py-1 rounded">নতুন</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">নতুন অ্যাকাউন্টের জন্য 100% বোনাস</p>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 font-bold">৳ 500</span>
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-1 rounded text-sm">দাবি করুন</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'claimed' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পুরস্কার</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পরিমাণ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">দাবির তারিখ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    কোন দাবিকৃত পুরস্কার পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পুরস্কার</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পরিমাণ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    কোন পুরস্কার ইতিহাস পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const InviteFriendTabContent = () => {
  const [activeTab, setActiveTab] = useState('invite');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">বন্ধুর আমন্ত্রণ</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'invite' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('invite')}
          >
            আমন্ত্রণ
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'list' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('list')}
          >
            আমন্ত্রিত তালিকা
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'reward' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('reward')}
          >
            পুরস্কার
          </button>
        </div>
        {activeTab === 'invite' && (
          <div>
            <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="font-medium mb-2">আপনার রেফারেল লিঙ্ক</h4>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  value="https://example.com/ref/t4590050297"
                  readOnly
                />
                <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-2 rounded flex items-center gap-1">
                  <FaCopy /> কপি
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">সোশ্যাল মিডিয়ায় শেয়ার করুন</h4>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                  <FaFacebookF />
                </button>
                <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors">
                  <FaTwitter />
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                  <FaTelegramPlane />
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors">
                  <FaWhatsapp />
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="font-medium mb-2">আমন্ত্রণ নিয়ম</h4>
              <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                <li>প্রতিটি সফল আমন্ত্রণের জন্য আপনি 50 টাকা বোনাস পাবেন</li>
                <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম 500 টাকা ডিপোজিট করতে হবে</li>
                <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম 3টি বেট প্লেস করতে হবে</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'list' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">ব্যবহারকারীর নাম</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">যোগদানের তারিখ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পুরস্কার</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    কোন আমন্ত্রিত বন্ধু পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'reward' && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800 p-4 rounded shadow border border-gray-600">
                <p className="text-sm text-gray-400">মোট আমন্ত্রণ</p>
                <p className="text-xl font-bold text-cyan-400">0</p>
              </div>
              <div className="bg-gray-800 p-4 rounded shadow border border-gray-600">
                <p className="text-sm text-gray-400">মোট পুরস্কার</p>
                <p className="text-xl font-bold text-cyan-400">৳ 0.00</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">আমন্ত্রিত বন্ধু</th>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পুরস্কার</th>
                    <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      কোন পুরস্কার রেকর্ড পাওয়া যায়নি
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MissionTabContent = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">মিশন</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'daily' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('daily')}
          >
            দৈনিক
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'weekly' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('weekly')}
          >
            সাপ্তাহিক
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'monthly' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('monthly')}
          >
            মাসিক
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'achievement' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('achievement')}
          >
            অর্জন
          </button>
        </div>
        {activeTab === 'daily' && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-600 rounded-lg p-4 flex items-center justify-between bg-gray-800">
                <div>
                  <h4 className="font-medium">প্রথম ডিপোজিট</h4>
                  <p className="text-sm text-gray-400">আজকে প্রথম ডিপোজিট করুন</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">৳ 50</span>
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-1 rounded text-sm">দাবি করুন</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'weekly' && (
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="border border-gray-600 rounded-lg p-4 flex items-center justify-between bg-gray-800">
                <div>
                  <h4 className="font-medium">সাপ্তাহিক বেটিং</h4>
                  <p className="text-sm text-gray-400">এই সপ্তাহে 10টি বেট পূর্ণ করুন</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">৳ 100</span>
                  <button className="bg-gray-600 text-gray-400 px-3 py-1 rounded text-sm" disabled>
                    চলমান
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'monthly' && (
          <div className="space-y-4">
            <div className="border border-gray-600 rounded-lg p-4 flex items-center justify-between bg-gray-800">
              <div>
                <h4 className="font-medium">মাসিক ডিপোজিট</h4>
                <p className="text-sm text-gray-400">এই মাসে 5000 টাকা ডিপোজিট করুন</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">৳ 500</span>
                <button className="bg-gray-600 text-gray-400 px-3 py-1 rounded text-sm" disabled>
                  চলমান
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'achievement' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">মিশন</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">অগ্রগতি</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">পুরস্কার</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    কোন অর্জন রেকর্ড পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const InternalMessageTabContent = () => {
  const [activeTab, setActiveTab] = useState('inbox');

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">অভ্যন্তরীণ বার্তা</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'inbox' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('inbox')}
          >
            ইনবক্স
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'sent' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('sent')}
          >
            প্রেরিত
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeTab === 'compose' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('compose')}
          >
            নতুন বার্তা
          </button>
        </div>
        {activeTab === 'inbox' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">প্রেরক</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">বিষয়</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    কোন ইনবক্স বার্তা পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'sent' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">প্রাপক</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">বিষয়</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">তারিখ</th>
                  <th className="py-2 px-4 text-left text-sm border-b border-gray-600">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    কোন প্রেরিত বার্তা পাওয়া যায়নি
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'compose' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">প্রাপক</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                placeholder="প্রাপকের ব্যবহারকারীর নাম লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">বিষয়</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                placeholder="বার্তার বিষয় লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">বার্তা</label>
              <textarea
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                rows="5"
                placeholder="আপনার বার্তা লিখুন..."
              ></textarea>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded">প্রেরণ করুন</button>
          </div>
        )}
      </div>
    </div>
  );
};

const DefaultTabContent = ({ activeLeftTab }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">{activeLeftTab}</h3>
      <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
        <p className="text-center text-gray-500 py-8">এই বিভাগটি উন্নয়নাধীন রয়েছে</p>
      </div>
    </div>
  );
};

export default Sidebar;