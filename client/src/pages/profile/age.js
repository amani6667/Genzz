import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaEye, 
  FaEyeSlash, 
  FaCopy, 
  FaFacebookF, 
  FaTwitter, 
  FaTelegramPlane, 
  FaWhatsapp,
  FaHistory,
  FaMoneyBillWave,
  FaGift,
  FaUserFriends,
  FaShieldAlt,
  FaKey,
  FaUser,
  FaArrowLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import { MdArrowBackIosNew } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
const Profile = ({ onBack }) => {
  // State for password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);
  const navigate=useNavigate();
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

  // Mock user data (replace with actual API call)
  const [userData, setUserData] = useState({
    _id: '12345',
    username: 't4590050297',
    avatar: 'https://i.ibb.co/k6pqKkL/avatar.jpg',
    createdAt: new Date().toISOString(),
    balance: 12500.75,
    bonus: 750.25,
    phone: null,
    referralCode: 't4590050297',
    referralCount: 12,
    referralEarnings: 3250.50,
    depositHistory: [],
    withdrawHistory: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL || 'https://api.example.com';

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
  const [referralHistory, setReferralHistory] = useState([
    { username: 'user1', createdAt: new Date(Date.now() - 86400000).toISOString(), status: 'active', earned: 200 },
    { username: 'user2', createdAt: new Date(Date.now() - 172800000).toISOString(), status: 'active', earned: 300 },
    { username: 'user3', createdAt: new Date(Date.now() - 259200000).toISOString(), status: 'inactive', earned: 150 },
    { username: 'user4', createdAt: new Date(Date.now() - 345600000).toISOString(), status: 'active', earned: 250 },
    { username: 'user5', createdAt: new Date(Date.now() - 432000000).toISOString(), status: 'inactive', earned: 100 },
  ]);

  // Tab management
  const tabs = [
    { name: 'নিরাপত্তা', icon: <FaShieldAlt className="text-lg" /> },
    { name: 'পাসওয়ার্ড', icon: <FaKey className="text-lg" /> },
    { name: 'সারাংশ', icon: <FaUser className="text-lg" /> },
    { name: 'পুরস্কার', icon: <FaGift className="text-lg" /> },
    { name: 'আয়', icon: <FaMoneyBillWave className="text-lg" /> },
    { name: 'রেফার', icon: <FaUserFriends className="text-lg" /> },
    { name: 'ইতিহাস', icon: <FaHistory className="text-lg" /> }
  ];
  
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  // Format date to Bengali
  const formatDateToBengali = (dateString) => {
    if (!dateString) return 'তারিখ পাওয়া যায়নি';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
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
    } else if (selectedTab === 'ইতিহাস') {
      fetchWithdrawalHistory();
    }
  }, [selectedTab]);

  // Mock API calls
  const fetchDepositHistory = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockData = [
        { 
          id: 1,
          payment_method: 'Bkash', 
          amount: 5000, 
          date: new Date(Date.now() - 3600000).toISOString(),
          status: 'completed'
        },
        { 
          id: 2,
          payment_method: 'Nagad', 
          amount: 3000, 
          date: new Date(Date.now() - 86400000).toISOString(),
          status: 'completed'
        },
        { 
          id: 3,
          payment_method: 'Rocket', 
          amount: 2500, 
          date: new Date(Date.now() - 172800000).toISOString(),
          status: 'completed'
        },
        { 
          id: 4,
          payment_method: 'Bank Transfer', 
          amount: 2000, 
          date: new Date(Date.now() - 259200000).toISOString(),
          status: 'completed'
        },
      ];
      setDepositHistory(mockData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch deposit history:', err);
      setError('Failed to fetch deposit history');
      setLoading(false);
    }
  };

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockData = [
        { 
          id: 1,
          payment_method: 'Bkash', 
          amount: 2000, 
          date: new Date(Date.now() - 3600000).toISOString(), 
          status: 'completed' 
        },
        { 
          id: 2,
          payment_method: 'Nagad', 
          amount: 1500, 
          date: new Date(Date.now() - 86400000).toISOString(), 
          status: 'pending' 
        },
        { 
          id: 3,
          payment_method: 'Bank Transfer', 
          amount: 3000, 
          date: new Date(Date.now() - 172800000).toISOString(), 
          status: 'completed' 
        },
        { 
          id: 4,
          payment_method: 'Rocket', 
          amount: 1000, 
          date: new Date(Date.now() - 259200000).toISOString(), 
          status: 'rejected' 
        },
      ];
      setWithdrawalHistory(mockData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch withdrawal history:', err);
      setError('Failed to fetch withdrawal history');
      setLoading(false);
    }
  };

  const fetchBetHistory = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockData = [
        { 
          id: 1,
          game: 'Cricket Match', 
          amount: 1500, 
          result: 'win', 
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          odds: 1.85
        },
        { 
          id: 2,
          game: 'Football Match', 
          amount: 1000, 
          result: 'loss', 
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          odds: 2.10
        },
        { 
          id: 3,
          game: 'Horse Race', 
          amount: 750, 
          result: 'win', 
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          odds: 3.50
        },
        { 
          id: 4,
          game: 'Tennis Match', 
          amount: 1200, 
          result: 'loss', 
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          odds: 1.95
        },
      ];
      setBetHistory(mockData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch bet history:', err);
      setError('Failed to fetch bet history');
      setLoading(false);
    }
  };

  const fetchReferralHistory = async () => {
    try {
      setLoading(true);
      // Mock data is already set in state
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch referral history:', err);
      setError('Failed to fetch referral history');
      setLoading(false);
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
      // Mock success response
      setUserData(prev => ({
        ...prev,
        phone: mobileNumber
      }));

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

    if (newLoginPassword.length < 8) {
      setFeedback({
        type: 'error',
        message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে',
        field: 'loginPassword'
      });
      return;
    }

    try {
      // Mock success response
      setFeedback({
        type: 'success',
        message: 'লগইন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!',
        field: 'loginPassword'
      });

      // Reset form
      setCurrentLoginPassword('');
      setNewLoginPassword('');
      setConfirmLoginPassword('');

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

    if (newTransactionPassword.length < 6) {
      setFeedback({
        type: 'error',
        message: 'লেনদেন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
        field: 'transactionPassword'
      });
      return;
    }

    try {
      // Mock success response
      setFeedback({
        type: 'success',
        message: 'লেনদেন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!',
        field: 'transactionPassword'
      });

      // Reset form
      setCurrentTransactionPassword('');
      setNewTransactionPassword('');
      setConfirmTransactionPassword('');

    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'লেনদেন পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে',
        field: 'transactionPassword'
      });
    }
  };

  if (loading) return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="mt-4 text-gray-300">লোড হচ্ছে...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <div className="text-red-500 text-lg font-medium mb-4">ত্রুটি: {error}</div>
        <button 
          onClick={() => setError(null)}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg transition-colors"
        >
          পুনরায় চেষ্টা করুন
        </button>
      </div>
    </div>
  );

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'completed':
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
            <FaCheckCircle className="mr-1" /> সম্পূর্ণ
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
            <FaClock className="mr-1" /> মুলতুবি
          </span>
        );
      case 'rejected':
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
            <FaTimesCircle className="mr-1" /> বাতিল
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
            অজানা
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-anek">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center border-b border-gray-700 sticky top-0 z-[1000] shadow-md">
        <button 
          onClick={()=>{navigate("/")}}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <MdArrowBackIosNew className="text-lg text-cyan-400" />
        </button>
        <h1 className="text-[18px] font-[600] ml-4 text-white">প্রোফাইল</h1>
      </div>

      {/* Mobile Number Alert Modal */}
      {showMobileAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full border border-cyan-600 shadow-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
              <FaShieldAlt className="mr-2" />
              মোবাইল নম্বর প্রয়োজন
            </h3>
            <p className="mb-4 text-gray-300">
              {alertContext === 'deposit' 
                ? 'ডিপোজিট করতে আপনার মোবাইল নম্বর যাচাইকরণ প্রয়োজন' 
                : 'উইথড্র করতে আপনার মোবাইল নম্বর যাচাইকরণ প্রয়োজন'}
            </p>
            
            <form onSubmit={handleAddMobile}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">মোবাইল নম্বর</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="01688XXXXXXXX"
                  maxLength={15}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">লেনদেন পাসওয়ার্ড</label>
                <div className="relative">
                  <input
                    type={showTransactionPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    value={mobileTransactionPassword}
                    onChange={(e) => setMobileTransactionPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="অন্তত ৬ অক্ষর"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                  >
                    {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                <div className="relative">
                  <input
                    type={showTransactionPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    value={confirmMobileTransactionPassword}
                    onChange={(e) => setConfirmMobileTransactionPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                    onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                  >
                    {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowMobileAlert(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors flex items-center"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback messages */}
      {feedback.message && (
        <div className={`mx-4 mt-4 p-3 rounded-lg border ${
          feedback.type === 'success' 
            ? 'bg-green-900/50 border-green-700 text-green-100' 
            : 'bg-red-900/50 border-red-700 text-red-100'
        }`}>
          <div className="flex items-center justify-between">
            <span>{feedback.message}</span>
            <button 
              onClick={() => setFeedback({ type: '', message: '', field: '' })}
              className="ml-2 text-lg hover:text-white transition-colors"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Profile Summary */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-lg border border-gray-700 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={"https://images.5943920202.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"}
                  alt="User"
                  className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-cyan-500 rounded-full p-1">
                  <div className="bg-white rounded-full p-1">
                    <FaCheckCircle className="text-cyan-500 text-xs" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">{userData?.username || 't4590050297'}</p>
                <p className="text-xs text-gray-400">
                  সদস্য পদ: {formatDateToBengali(userData?.createdAt) || '২০২৫-০৭-২৭'}
                </p>
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-400 mb-1">মোট ব্যালেন্স</p>
              <p className="text-3xl font-bold text-cyan-400">
                ৳ {userData?.balance || '০.০০'}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <p className="text-gray-400">বোনাস</p>
                <p className="text-cyan-300 font-medium">৳{userData?.bonus?.toLocaleString('bn-BD') || '০.০০'}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">রেফারেল</p>
                <p className="text-cyan-300 font-medium">৳{userData?.referralEarnings?.toLocaleString('bn-BD') || '০.০০'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <NavLink 
              to="/deposit"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-2 rounded-[5px] text-sm font-medium shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <FaMoneyBillWave /> ডিপোজিট
          </NavLink>
          <NavLink 
          to="/withdraw"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-2 rounded-[5px] cursor-pointer text-sm font-medium shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <FaMoneyBillWave /> উত্তোলন
          </NavLink>
          <NavLink className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-2 cursor-pointer rounded-[5px] text-sm font-medium shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <FaMoneyBillWave /> ট্রান্সফার
          </NavLink>
          <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 cursor-pointer px-2 rounded-[5px] text-sm font-medium shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <FaHistory /> বেটিং ইতিহাস
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-3 mb-6 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(tab.name)}
              className={`px-4 py-2 mr-2 rounded-full flex items-center whitespace-nowrap transition-all ${
                selectedTab === tab.name
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-md'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-md">
          {selectedTab === 'নিরাপত্তা' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaShieldAlt className="mr-2 text-cyan-400" />
                অ্যাকাউন্ট নিরাপত্তা
              </h3>
              
              {/* Mobile Number Section */}
              <div className="bg-gray-800 p-4 rounded-lg shadow mb-6 border border-gray-700">
                <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                  <FaKey className="mr-2" />
                  মোবাইল নম্বর
                </h4>
                {userData?.phone ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">আপনার মোবাইল নম্বর</p>
                      <p className="text-white font-medium">{formatMobileNumber(userData.phone)}</p>
                    </div>
                    <StatusBadge status="completed" />
                  </div>
                ) : (
                  <>
                    {feedback.field === 'mobile' && (
                      <div className={`mb-3 p-3 rounded-lg text-sm ${
                        feedback.type === 'success' 
                          ? 'bg-green-900/50 border border-green-700 text-green-100' 
                          : 'bg-red-900/50 border border-red-700 text-red-100'
                      }`}>
                        {feedback.message}
                      </div>
                    )}
                    <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-3 mb-4">
                      <p className="text-sm text-yellow-300">লেনদেনের জন্য আপনাকে আপনার মোবাইল নম্বর যাচাই করতে হবে</p>
                    </div>
                    <form onSubmit={handleAddMobile}>
                      <div className="space-y-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">মোবাইল নম্বর</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="01688XXXXXXXX"
                            maxLength={15}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">লেনদেন পাসওয়ার্ড</label>
                          <div className="relative">
                            <input
                              type={showTransactionPassword ? "text" : "password"}
                              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                              value={mobileTransactionPassword}
                              onChange={(e) => setMobileTransactionPassword(e.target.value)}
                              required
                              minLength={6}
                              placeholder="অন্তত ৬ অক্ষর"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                              onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                            >
                              {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                          <div className="relative">
                            <input
                              type={showTransactionPassword ? "text" : "password"}
                              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                              value={confirmMobileTransactionPassword}
                              onChange={(e) => setConfirmMobileTransactionPassword(e.target.value)}
                              required
                              minLength={6}
                              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                              onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                            >
                              {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle /> মোবাইল নম্বর যাচাই করুন
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}

          {selectedTab === 'পাসওয়ার্ড' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaKey className="mr-2 text-cyan-400" />
                পাসওয়ার্ড আপডেট
              </h3>
              
              {/* Login Password Change */}
              <div className="bg-gray-800 p-4 rounded-lg shadow mb-6 border border-gray-700">
                <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                  <FaKey className="mr-2" />
                  লগইন পাসওয়ার্ড পরিবর্তন করুন
                </h4>
                {feedback.field === 'loginPassword' && (
                  <div className={`mb-3 p-3 rounded-lg text-sm ${
                    feedback.type === 'success' 
                      ? 'bg-green-900/50 border border-green-700 text-green-100' 
                      : 'bg-red-900/50 border border-red-700 text-red-100'
                  }`}>
                    {feedback.message}
                  </div>
                )}
                <form onSubmit={handleLoginPasswordChange}>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">বর্তমান পাসওয়ার্ড</label>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          value={currentLoginPassword}
                          onChange={(e) => setCurrentLoginPassword(e.target.value)}
                          required
                          placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">নতুন পাসওয়ার্ড</label>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          value={newLoginPassword}
                          onChange={(e) => setNewLoginPassword(e.target.value)}
                          required
                          minLength={8}
                          placeholder="অন্তত ৮ অক্ষর"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          value={confirmLoginPassword}
                          onChange={(e) => setConfirmLoginPassword(e.target.value)}
                          required
                          minLength={8}
                          placeholder="নতুন পাসওয়ার্ড নিশ্চিত করুন"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle /> পাসওয়ার্ড পরিবর্তন করুন
                  </button>
                </form>
              </div>

              {/* Transaction Password Change */}
              {userData?.phone && (
                <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
                  <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                    <FaKey className="mr-2" />
                    লেনদেন পাসওয়ার্ড পরিবর্তন করুন
                  </h4>
                  {feedback.field === 'transactionPassword' && (
                    <div className={`mb-3 p-3 rounded-lg text-sm ${
                      feedback.type === 'success' 
                        ? 'bg-green-900/50 border border-green-700 text-green-100' 
                        : 'bg-red-900/50 border border-red-700 text-red-100'
                    }`}>
                      {feedback.message}
                    </div>
                  )}
                  <form onSubmit={handleTransactionPasswordChange}>
                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">বর্তমান লেনদেন পাসওয়ার্ড</label>
                        <div className="relative">
                          <input
                            type={showTransactionPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            value={currentTransactionPassword}
                            onChange={(e) => setCurrentTransactionPassword(e.target.value)}
                            required
                            placeholder="বর্তমান লেনদেন পাসওয়ার্ড"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                            onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                          >
                            {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">নতুন লেনদেন পাসওয়ার্ড</label>
                        <div className="relative">
                          <input
                            type={showTransactionPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            value={newTransactionPassword}
                            onChange={(e) => setNewTransactionPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="অন্তত ৬ অক্ষর"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                            onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                          >
                            {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <div className="relative">
                          <input
                            type={showTransactionPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                            value={confirmTransactionPassword}
                            onChange={(e) => setConfirmTransactionPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="নতুন লেনদেন পাসওয়ার্ড নিশ্চিত করুন"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors"
                            onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                          >
                            {showTransactionPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle /> লেনদেন পাসওয়ার্ড পরিবর্তন করুন
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'সারাংশ' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaUser className="mr-2 text-cyan-400" />
                অ্যাকাউন্ট সারাংশ
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-sm text-gray-400">মোট ব্যালেন্স</p>
                  <p className="text-xl font-bold text-cyan-400">৳ {userData?.balance?.toLocaleString('bn-BD') || '০.০০'}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-sm text-gray-400">বোনাস</p>
                  <p className="text-xl font-bold text-cyan-400">৳ {userData?.bonus?.toLocaleString('bn-BD') || '০.০০'}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                  <FaHistory className="mr-2" />
                  সাম্প্রতিক লেনদেন
                </h4>
                <div className="space-y-3">
                  {betHistory.length > 0 ? (
                    betHistory.slice(0, 5).map((bet) => (
                      <div key={bet.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">{bet.game}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDateToBengali(bet.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${
                              bet.result === 'win' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {bet.result === 'win' ? '+' : '-'}৳{bet.amount}
                            </p>
                            <p className="text-xs text-gray-400">অড: {bet.odds}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="text-gray-500">কোন লেনদেন পাওয়া যায়নি</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'পুরস্কার' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaGift className="mr-2 text-cyan-400" />
                আপনার পুরস্কার
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-sm text-gray-400">উপলব্ধ বোনাস</p>
                  <p className="text-xl font-bold text-cyan-400">৳ {userData?.bonus?.toLocaleString('bn-BD') || '০.০০'}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-sm text-gray-400">মোট পুরস্কার</p>
                  <p className="text-xl font-bold text-cyan-400">৳ {userData?.referralEarnings?.toLocaleString('bn-BD') || '০.০০'}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                  <FaHistory className="mr-2" />
                  পুরস্কার ইতিহাস
                </h4>
                <div className="space-y-3">
                  {referralHistory.length > 0 ? (
                    referralHistory.map((reward) => (
                      <div key={reward.username} className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">রেফারেল বোনাস ({reward.username})</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDateToBengali(reward.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">+৳{reward.earned}</p>
                            <StatusBadge status={reward.status} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="text-gray-500">কোন পুরস্কার ইতিহাস পাওয়া যায়নি</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'আয়' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaMoneyBillWave className="mr-2 text-cyan-400" />
                আয়ের বিবরণ
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-gray-800 p-3 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-xs text-gray-400">আজকের আয়</p>
                  <p className="font-bold text-cyan-400">৳ 1,250</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-xs text-gray-400">গতকালের আয়</p>
                  <p className="font-bold text-cyan-400">৳ 3,750</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-xs text-gray-400">এই মাসের আয়</p>
                  <p className="font-bold text-cyan-400">৳ 12,500</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                  <FaHistory className="mr-2" />
                  আয়ের ইতিহাস
                </h4>
                <div className="space-y-3">
                  {depositHistory.length > 0 ? (
                    depositHistory.map((deposit) => (
                      <div key={deposit.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">{deposit.payment_method}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDateToBengali(deposit.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">+৳{deposit.amount}</p>
                            <StatusBadge status={deposit.status} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="text-gray-500">কোন আয়ের ইতিহাস পাওয়া যায়নি</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'রেফার' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaUserFriends className="mr-2 text-cyan-400" />
                রেফারেল তথ্য
              </h3>
              <div className="bg-gray-800 p-4 rounded-lg shadow mb-6 border border-gray-700 hover:border-cyan-500 transition-colors">
                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-2">আপনার রেফারেল লিঙ্ক</p>
                  <div className="bg-gray-700 p-3 rounded-lg break-all text-sm text-cyan-400">
                    {`${base_url}/ref/${userData?.referralCode}`}
                  </div>
                </div>
                <button 
                  onClick={copyReferralLink}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <FaCopy /> লিঙ্ক কপি করুন
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-gray-800 p-3 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-xs text-gray-400">মোট রেফারেল</p>
                  <p className="font-bold text-cyan-400">{userData?.referralCount || 0}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-xs text-gray-400">সক্রিয় রেফারেল</p>
                  <p className="font-bold text-cyan-400">{referralHistory.filter(u => u.status === 'active').length || 0}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                  <p className="text-xs text-gray-400">রেফারেল বোনাস</p>
                  <p className="font-bold text-cyan-400">৳ {userData?.referralEarnings?.toLocaleString('bn-BD') || '০.০০'}</p>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 hover:border-cyan-500 transition-colors">
                <h4 className="font-medium mb-3 text-cyan-400 flex items-center">
                  <FaShareAlt className="mr-2" />
                  সোশ্যাল মিডিয়ায় শেয়ার করুন
                </h4>
                <div className="flex justify-center gap-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors transform hover:scale-110">
                    <FaFacebookF />
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-300 text-white p-3 rounded-full transition-colors transform hover:scale-110">
                    <FaTwitter />
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white p-3 rounded-full transition-colors transform hover:scale-110">
                    <FaTelegramPlane />
                  </button>
                  <button className="bg-green-500 hover:bg-green-400 text-white p-3 rounded-full transition-colors transform hover:scale-110">
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'ইতিহাস' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FaHistory className="mr-2 text-cyan-400" />
                উত্তোলন ইতিহাস
              </h3>
              <div className="space-y-3">
                {withdrawalHistory.length > 0 ? (
                  withdrawalHistory.map((withdrawal) => (
                    <div key={withdrawal.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-white">{withdrawal.payment_method}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDateToBengali(withdrawal.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-red-400 font-bold">-৳{withdrawal.amount}</p>
                          <StatusBadge status={withdrawal.status} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-gray-500">কোন উত্তোলন ইতিহাস পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Profile;