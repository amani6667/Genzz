import React, { useState, useEffect,useRef } from 'react';
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
  FaCalendarAlt,
  FaTimesCircle ,
  
} from 'react-icons/fa';
import { FaCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import axios from "axios"
import toast,{Toaster} from "react-hot-toast"
import popular_img from "../../assets/popular.png"
import dice_img from "../../assets/dice.png"
import user_img from "../../assets/user.png"
import bonus_img from "../../assets/bonus.png"
import affiliate_img from "../../assets/affiliate.png"
import question_img from "../../assets/question.png"
import teamwork_img from "../../assets/teamwork.png"
import party_img from "../../assets/party.png"
import link_img from "../../assets/link.png"
// ------------------proifle-images--------------------
import man from "../../assets/profileimages/man.png"
import man1 from "../../assets/profileimages/man1.png"
import man2 from "../../assets/profileimages/man2.png"
import man3 from "../../assets/profileimages/man3.png"
import man4 from "../../assets/profileimages/man4.png"
import man5 from "../../assets/profileimages/man5.png"
import man6 from "../../assets/profileimages/man6.png"

const menuItems = [
  { 
    icon: popular_img, 
    label: 'ক্যাসিনো',
    path: '/hot-games' 
  },
  { 
    icon: dice_img, 
    label: 'জনপ্রিয়',
    path: '/hot-games' 
  },
  { 
    icon: user_img, 
    label: 'আমার একাউন্ট',
    leftTab: 'আমার অ্যাকাউন্ট' // This will open the profile popup with the "আমার অ্যাকাউন্ট" tab selected
  },
  { 
    icon: bonus_img, 
    label: 'বোনাস',
    leftTab: 'পুরস্কার কেন্দ্র' // This will open the profile popup with the "পুরস্কার কেন্দ্র" tab selected
  },
  { 
    icon: teamwork_img, 
    label: 'প্রভাইডার',
    path: '/provider' 
  },
  { 
    icon: affiliate_img, 
    label: 'এফিলিয়েট',
    path: '/affiliate-programme' 
  },
  { 
    icon: party_img, 
    label: 'ভিআইপি ক্লাব',
    path: '/vip-club' 
  },
  { 
    icon: link_img, 
    label: 'রেফারেল প্রোগ্রাম'
    // This will open the InvitePopup if logged in, or login popup if not
  },
  { 
    icon: question_img,
    label: 'FAQ/নীতি',
    path: '/faq-policy' 
  },
];

const leftMenuItems = [
  'আমার অ্যাকাউন্ট',
  'ডিপোজিট',
  'উত্তোলন',
  'বেটিং রেকর্ড',
  'অ্যাকাউন্ট রেকর্ড',
  // 'লাভ ও ক্ষতি',
  // 'পুরস্কার কেন্দ্র',
  'বন্ধুর আমন্ত্রণ করুন',
  // 'মিশন',
  // 'অভ্যন্তরীণ বার্তা',
];
const Sidebar = ({ showPopup, setShowPopup, activeLeftTab, setActiveLeftTab }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const { userData, loading, error } = useUser(); // Get user data from context

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSupport(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = (item) => {
    if (item.label === 'রেফারেল প্রোগ্রাম') {
      if (!userData) {
        // If not logged in, show login popup
        setShowAuthModal(true);
        setActiveTab('login');
      } else {
        // If logged in, show invite popup
        setShowInvitePopup(true);
      }
    } else if (item.label === 'আমার একাউন্ট' || item.label === 'বোনাস') {
      if (!userData) {
        // If not logged in, show login popup
        setShowAuthModal(true);
        setActiveTab('login');
      } else {
        // If logged in, show the appropriate popup
        setSelectedMenu(item);
        if (item.leftTab) {
          setActiveLeftTab(item.leftTab);
        }
        setShowPopup(true);
      }
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

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <div className="bg-gray-900 w-[330px] border-r-[1px] border-gray-600 h-full fixed top-[70px] overflow-y-auto no-scrollbar left-0 px-4 py-6">
        {/* Original Menu Grid */}
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item, index) => (
            <MenuCard key={index} item={item} onClick={() => handleMenuClick(item)} />
          ))}
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

      {showAuthModal && (
        <AuthModal 
          showAuthModal={showAuthModal} 
          closeAuthModal={closeAuthModal} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  );
};

const AuthModal = ({ showAuthModal, closeAuthModal, activeTab, setActiveTab }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    formError: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [referralCodeValid, setReferralCodeValid] = useState(false);
  const [referralCodeChecking, setReferralCodeChecking] = useState(false);
  const [referralCodeError, setReferralCodeError] = useState('');
  const [referrerInfo, setReferrerInfo] = useState(null);
  const otpInputRefs = useRef([]);
  const API_BASE_URL = import.meta.env.VITE_API_KEY_Base_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (showOtpModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, showOtpModal]);

  const checkReferralCode = async (code) => {
    if (!code) {
      setReferralCodeValid(false);
      setReferralCodeError('');
      setReferrerInfo(null);
      return;
    }

    setReferralCodeChecking(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/check-referral-code/${code}`);
      if (response.data.exists) {
        setReferralCodeValid(true);
        setReferralCodeError('');
        setReferrerInfo(response.data.referrer);
      } else {
        setReferralCodeValid(false);
        setReferralCodeError('অবৈধ রেফারেল কোড');
        setReferrerInfo(null);
      }
    } catch (error) {
      setReferralCodeValid(false);
      setReferralCodeError('রেফারেল কোড চেক করতে সমস্যা হয়েছে');
      setReferrerInfo(null);
    } finally {
      setReferralCodeChecking(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name] || errors.formError) {
      setErrors({
        ...errors,
        [name]: '',
        formError: ''
      });
    }

    if (name === 'referralCode') {
      checkReferralCode(value);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      password: '',
      confirmPassword: '',
      email: '',
      formError: ''
    };

    if (!formData.email) {
      newErrors.email = 'ইমেইল প্রয়োজন';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল দিন';
      valid = false;
    }

    if ((activeTab === 'login' || activeTab === 'register' || activeTab === 'reset-password') && !formData.password) {
      newErrors.password = 'পাসওয়ার্ড প্রয়োজন';
      valid = false;
    } else if ((activeTab === 'login' || activeTab === 'register' || activeTab === 'reset-password') && formData.password.length < 6) {
      newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে';
      valid = false;
    }

    if (activeTab === 'register' || activeTab === 'reset-password') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না';
        valid = false;
      }
    }

    if (activeTab === 'register' && formData.referralCode && !referralCodeValid) {
      newErrors.formError = 'অবৈধ রেফারেল কোড';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      closeAuthModal();
      toast.success('সফলভাবে লগইন করা হয়েছে!');
      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrors({
        ...errors,
        formError: error.response?.data?.message || 'লগইন করতে সমস্যা হয়েছে'
      });
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    if (formData.referralCode && !referralCodeValid) {
      setErrors({
        ...errors,
        formError: 'অবৈধ রেফারেল কোড'
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode
      });

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      closeAuthModal();
      toast.success('সফলভাবে নিবন্ধন করা হয়েছে!');
      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrors({
        ...errors,
        formError: error.response?.data?.message || 'নিবন্ধন করতে সমস্যা হয়েছে'
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/request-password-reset`, {
        email: formData.email
      });

      setOtpEmail(formData.email);
      setShowOtpModal(true);
      setOtpRequested(true);
      setCountdown(60);
      toast.success('OTP ইমেইলে পাঠানো হয়েছে');
    } catch (error) {
      setErrors({
        ...errors,
        formError: error.response?.data?.message || 'পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে'
      });
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      toast.error('সম্পূর্ণ OTP দিন');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-reset-otp`, {
        email: otpEmail,
        otp: otpCode
      });

      const { resetToken } = response.data;
      
      localStorage.setItem('resetToken', resetToken);
      
      setActiveTab('reset-password');
      setShowOtpModal(false);
      setOtp(['', '', '', '', '', '']);
      toast.success('OTP সফলভাবে যাচাই করা হয়েছে');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP যাচাই করতে সমস্যা হয়েছে');
    }
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      const resetToken = localStorage.getItem('resetToken');
      
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        resetToken,
        newPassword: formData.password
      });

      localStorage.removeItem('resetToken');
      closeAuthModal();
      toast.success('পাসওয়ার্ড সফলভাবে রিসেট করা হয়েছে');
      
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: response.data.user.email,
        password: formData.password
      });

      const { token, user } = loginResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrors({
        ...errors,
        formError: error.response?.data?.message || 'পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে'
      });
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;

    try {
      await axios.post(`${API_BASE_URL}/auth/request-password-reset`, {
        email: otpEmail
      });

      setCountdown(60);
      toast.success('নতুন OTP ইমেইলে পাঠানো হয়েছে');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP পুনরায় পাঠাতে সমস্যা হয়েছে');
    }
  };

  return (
    <>
      {showAuthModal && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-[rgba(0,0,0,0.8)] p-4">
          <div className="bg-gray-800 w-full max-w-lg rounded-[5px] shadow-2xl overflow-hidden border border-gray-700">
            <div className="px-6 py-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">
                {activeTab === 'login' && 'লগইন করুন'}
                {activeTab === 'register' && 'নিবন্ধন করুন'}
                {activeTab === 'forgot-password' && 'পাসওয়ার্ড রিসেট করুন'}
                {activeTab === 'reset-password' && 'নতুন পাসওয়ার্ড সেট করুন'}
              </h2>
              <button 
                onClick={closeAuthModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTimesCircle className="text-xl" />
              </button>
            </div>

            <div className="flex border-b border-gray-700">
              {['login', 'register'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm md:text-base font-medium cursor-pointer ${
                    activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'
                  }`}
                >
                  {tab === 'login' ? 'লগইন' : 'নিবন্ধন'}
                </button>
              ))}
            </div>

            <div className="p-6">
              {errors.formError && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-300 text-sm">
                  {errors.formError}
                </div>
              )}

              {activeTab === 'login' && (
                <div className="space-y-4">
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ইমেইল"
                      className={`w-full bg-gray-700 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="পাসওয়ার্ড"
                      className={`w-full bg-gray-700 text-white border ${errors.password ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    <button
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm text-cyan-400">
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="mr-2 accent-blue-500" />
                      <label htmlFor="remember">মনে রাখুন</label>
                    </div>
                    <button 
                      onClick={() => setActiveTab('forgot-password')}
                      className="text-cyan-400 hover:underline cursor-pointer"
                    >
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>

                  <button 
                    onClick={handleLogin}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-[20px] py-[10px] rounded-[5px] "
                  >
                    লগইন করুন
                  </button>
                </div>
              )}

              {activeTab === 'register' && (
                <div className="space-y-4">
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ইমেইল"
                      className={`w-full bg-gray-700 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="পাসওয়ার্ড"
                      className={`w-full bg-gray-700 text-white border ${errors.password ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    <button
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                      className={`w-full bg-gray-700 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    <button
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaUserFriends className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      placeholder="রেফারেল কোড (ঐচ্ছিক)"
                      className="w-full bg-gray-700 text-white border border-gray-600 py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400"
                    />
                    {referralCodeChecking && (
                      <div className="absolute right-3 top-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                      </div>
                    )}
                    {referralCodeError && !referralCodeChecking && (
                      <p className="text-red-400 text-xs mt-1">{referralCodeError}</p>
                    )}
                    {referrerInfo && !referralCodeChecking && (
                      <p className="text-green-400 text-xs mt-1">
                        রেফারার: {referrerInfo.username}
                      </p>
                    )}
                  </div>

                  <button 
                    onClick={handleRegister}
                    disabled={formData.referralCode && !referralCodeValid}
                    className={`w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-[20px] py-[10px] rounded-[5px] ${
                      formData.referralCode && !referralCodeValid ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    নিবন্ধন করুন
                  </button>

                  <div className="text-center text-sm text-gray-400">
                    নিবন্ধন করে, আপনি আমাদের <a href="#" className="text-cyan-400 hover:underline">শর্তাবলী</a> এবং <a href="#" className="text-cyan-400 hover:underline">গোপনীয়তা নীতি</a> স্বীকার করেছেন
                  </div>
                </div>
              )}

              {activeTab === 'forgot-password' && (
                <div className="space-y-4">
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="আপনার ইমেইল ঠিকানা"
                      className={`w-full bg-gray-700 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <button 
                    onClick={handleForgotPassword}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-[20px] py-[10px] rounded-[5px] "
                  >
                    পাসওয়ার্ড রিসেট করুন
                  </button>

                  <button 
                    onClick={() => setActiveTab('login')}
                    className="flex items-center justify-center w-full text-cyan-400 hover:underline cursor-pointer text-sm"
                  >
                    <FaArrowLeft className="mr-1" /> লগইন পৃষ্ঠায় ফিরে যান
                  </button>
                </div>
              )}

              {activeTab === 'reset-password' && (
                <div className="space-y-4">
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="নতুন পাসওয়ার্ড"
                      className={`w-full bg-gray-700 text-white border ${errors.password ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    <button
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-cyan-400 text-sm md:text-base" />
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                      className={`w-full bg-gray-700 text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base placeholder-gray-400`}
                    />
                    <button
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button 
                    onClick={handleResetPassword}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-[20px] py-[10px] rounded-[5px] "
                  >
                    পাসওয়ার্ড পরিবর্তন করুন
                  </button>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-700">
              <div className="text-center text-sm text-gray-400">
                {activeTab === 'login' ? (
                  <>
                    অ্যাকাউন্ট নেই?{' '}
                    <button 
                      onClick={() => setActiveTab('register')}
                      className="text-cyan-400 hover:underline cursor-pointer"
                    >
                      নিবন্ধন করুন
                    </button>
                  </>
                ) : (
                  <>
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <button 
                      onClick={() => setActiveTab('login')}
                      className="text-cyan-400 hover:underline cursor-pointer"
                    >
                      লগইন করুন
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showOtpModal && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-[rgba(0,0,0,0.6)] p-4 backdrop-blur-lg">
          <div className="bg-gray-800 w-full max-w-lg rounded-[5px] shadow-2xl overflow-hidden border border-gray-700">
            <div className="px-6 py-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">OTP যাচাই করুন</h2>
              <button 
                onClick={() => {
                  setShowOtpModal(false);
                  setOtp(['', '', '', '', '', '']);
                }}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTimesCircle className="text-xl" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-300 mb-6 text-center">
                ৬-অংকের OTP কোডটি ইমেইলে পাঠানো হয়েছে: {otpEmail}
              </p>

              <div className="flex justify-center space-x-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 bg-gray-700 border border-gray-600 rounded-md text-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>

              <button 
                onClick={handleVerifyOtp}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-[20px] py-[10px] rounded-[5px] mb-4"
              >
                যাচাই করুন
              </button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-gray-400 text-sm">
                    {countdown} সেকেন্ড পর নতুন OTP পাঠানো যাবে
                  </p>
                ) : (
                  <button 
                    onClick={resendOtp}
                    className="text-cyan-400 hover:underline cursor-pointer text-sm"
                  >
                    OTP পুনরায় পাঠান
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MenuCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-800 hover:bg-gray-700 flex justify-start items-center transition-all duration-300 border-[1px] border-gray-700 text-white rounded-[5px] px-4 py-1.5 gap-2 cursor-pointer"
  >
    <div className="text-2xl mb-2">
      <img className='w-[30px]' src={item.icon} alt="" />
    </div>
    <div className="text-xs md:text-sm text-center leading-tight font-medium text-gray-300">{item.label}</div>
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
  const [activeTab, setActiveTab] = useState('invite');
  const { userData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

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
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 max-w-xl w-full relative">
        <button 
          className="absolute top-4 right-4 cursor-pointer text-gray-300 hover:text-white text-lg transition-colors" 
          onClick={onClose}
        >
          <FaTimes />
        </button>
        
        <h3 className="text-lg font-semibold mb-4 text-white">বন্ধুর আমন্ত্রণ</h3>
        <div className="bg-gray-700 p-4 rounded shadow border text-white border-gray-600">
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
                    className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white text-sm"
                    value={userData?.referralCode ? `${base_url}/ref/${userData.referralCode}` : base_url}
                    readOnly
                  />
                  <button 
                    onClick={copyReferralLink}
                    className={`bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-2 rounded flex items-center gap-1 text-sm ${
                      copied ? 'bg-green-500 hover:bg-green-600' : ''
                    }`}
                  >
                    {copied ? 'কপি হয়েছে!' : <><FaCopy /> কপি</>}
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">সোশ্যাল মিডিয়ায় শেয়ার করুন</h4>
                <div className="flex gap-2">
                  <a 
                    href={shareLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <FaFacebookF size={14} />
                  </a>
                  <a 
                    href={shareLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
                  >
                    <FaTwitter size={14} />
                  </a>
                  <a 
                    href={shareLinks.telegram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                  >
                    <FaTelegramPlane size={14} />
                  </a>
                  <a 
                    href={shareLinks.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                  >
                    <FaWhatsapp size={14} />
                  </a>
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
                      {userData?.referrals?.length > 0 ? (
                        userData.referrals.map(referral => (
                          <tr key={referral.id}>
                            <td className="py-2 px-4 border-b border-gray-600">{referral.username}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{new Date(referral.joinedAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b border-gray-600">{referral.status}</td>
                            <td className="py-2 px-4 border-b border-gray-600">৳{referral.reward || 0}</td>
                          </tr>
                        ))
                      ) : (
                        'কোন আমন্ত্রিত বন্ধু পাওয়া যায়নি'
                      )}
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
                  <p className="text-xl font-bold text-cyan-400">{userData?.referrals?.length || 0}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded shadow border border-gray-600">
                  <p className="text-sm text-gray-400">মোট পুরস্কার</p>
                  <p className="text-xl font-bold text-cyan-400">৳{userData?.referralEarnings || 0}</p>
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
                        {userData?.referralRewards?.length > 0 ? (
                          userData.referralRewards.map(reward => (
                            <tr key={reward.id}>
                              <td className="py-2 px-4 border-b border-gray-600">{new Date(reward.date).toLocaleDateString()}</td>
                              <td className="py-2 px-4 border-b border-gray-600">{reward.username}</td>
                              <td className="py-2 px-4 border-b border-gray-600">৳{reward.amount}</td>
                              <td className="py-2 px-4 border-b border-gray-600">{reward.status}</td>
                            </tr>
                          ))
                        ) : (
                          'কোন পুরস্কার রেকর্ড পাওয়া যায়নি'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Create an array of all profile images
const profileImages = [man, man1, man2, man3, man4, man5, man6];

// Function to get a consistent random image based on username
const getProfileImage = (username) => {
  if (!username) return man; // default image if no username
  
  // Create a simple hash from the username to get a consistent index
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use absolute value and modulo to get a valid index
  const index = Math.abs(hash) % profileImages.length;
  return profileImages[index];
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

  // State for editable username
  const [editableUsername, setEditableUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  // Initialize editable username when userData loads
  useEffect(() => {
    if (userData?.username) {
      setEditableUsername(userData.username);
    }
  }, [userData]);

  // Tab management
  const tabs = ['ব্যক্তিগত তথ্য', 'নিরাপত্তা', 'পাসওয়ার্ড আপডেট'];
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

  // Format balance with Bengali digits and commas
  const formatBalance = (amount) => {
    if (amount === undefined || amount === null) return '০.০০';
    const formatted = new Intl.NumberFormat('en-US').format(amount.toFixed(2));
    return formatted.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
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
      const response = await axios.put(`${base_url}/user/update-account-password`, {
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
      const response = await axios.put(`${base_url}/user/update-transaction-password`, {
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
const handleUsernameUpdate = async () => {
  try {
    const response = await axios.put(
      `${base_url}/user/update-username`,
      {
        userId: userData._id,
        newUsername: editableUsername,
        password: currentLoginPassword // Add current password for verification
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    setFeedback({
      type: 'success',
      message: 'ব্যবহারকারীর নাম সফলভাবে আপডেট করা হয়েছে!',
      field: 'personalInfo'
    });

    setIsEditingUsername(false);
    // Clear password field after successful update
    setCurrentLoginPassword('');
    fetchUserData();

  } catch (err) {
    setFeedback({
      type: 'error',
      message: err.response?.data?.message || 'ব্যবহারকারীর নাম আপডেট করতে ব্যর্থ হয়েছে',
      field: 'personalInfo'
    });
  }
};

  if (loading) return <div className="text-white text-center py-8">লোড হচ্ছে...</div>;
  if (error) return <div className="text-center py-8 text-red-500">ত্রুটি: {error}</div>;

  return (
    <div className="text-white">
      {/* Feedback messages */}
      {/* {feedback.message && (
        <div className={`mb-4 p-3 rounded ${feedback.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
          {feedback.message}
          <button 
            onClick={() => setFeedback({ type: '', message: '', field: '' })}
            className="float-right font-bold"
          >
            &times;
          </button>
        </div>
      )} */}

      {/* Profile Info */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow mb-6 border border-gray-700">
        <div className="flex items-center gap-4">
          <div className="relative">
         <img
    src={getProfileImage(userData?.username)}
    alt="User"
    className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover"
  />
            
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{userData?.username || 'N/A'}</h3>
                <p className="text-sm text-gray-400">
                  আইডি: {userData?.player_id } | লেভেল: {userData?.level || '1'}
                </p>
              </div>
              {/* <span className="bg-cyan-500 bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
                {userData?.isVIP ? 'VIP Member' : 'Regular Member'}
              </span> */}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <p>যোগদান করেছেন: {formatDateToBengali(userData?.createdAt) || 'N/A'}</p>
              <p>সর্বশেষ লগইন: {formatDateToBengali(userData?.last_login) || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-5 py-3 font-medium cursor-pointer text-sm border-b-2 transition-colors whitespace-nowrap ${
              selectedTab === tab
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-cyan-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        {selectedTab === 'ব্যক্তিগত তথ্য' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">ব্যক্তিগত তথ্য</h3>
            
            {/* Balance Cards */}
          {/* Balance Cards - All 5 Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  {/* Main Balance */}
  <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-lg border border-blue-700 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-blue-200">মেইন ব্যালেন্স</p>
        <p className="text-2xl font-bold">{formatBalance(userData?.balance)} ৳</p>
      </div>
      <div className="bg-blue-700 bg-opacity-30 p-2 rounded-full">
      <FaBangladeshiTakaSign/>
      </div>
    </div>
  </div>

  {/* Bonus Balance */}
  <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-4 rounded-lg border border-purple-700 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-purple-200">বোনাস ব্যালেন্স</p>
        <p className="text-2xl font-bold">{formatBalance(userData?.bonus_balance)} ৳</p>
      </div>
      <div className="bg-purple-700 bg-opacity-30 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
        </svg>
      </div>
    </div>
  </div>

  {/* Referral Balance */}
  <div className="bg-gradient-to-br from-green-900 to-green-800 p-4 rounded-lg border border-green-700 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-green-200">রেফারেল ব্যালেন্স</p>
        <p className="text-2xl font-bold">{formatBalance(userData?.refer_balance)} ৳</p>
      </div>
      <div className="bg-green-700 bg-opacity-30 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
    </div>
  </div>

  {/* Wager Remaining */}
  <div className="bg-gradient-to-br from-amber-900 to-amber-800 p-4 rounded-lg border border-amber-700 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-amber-200">ওয়েজার বাকি</p>
        <p className="text-2xl font-bold">{formatBalance(userData?.wager_remaining || 0)} ৳</p>
      </div>
      <div className="bg-amber-700 bg-opacity-30 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>

  {/* Wager Completed */}
  <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-lg border border-emerald-700 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-emerald-200">ওয়েজার সম্পন্ন</p>
        <p className="text-2xl font-bold">{formatBalance(userData?.wager_completed || 0)} ৳</p>
      </div>
      <div className="bg-emerald-700 bg-opacity-30 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>
</div>
      <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow mb-6 border border-gray-600">
  {feedback.field === 'personalInfo' && (
    <div className={`mb-3 p-3 rounded text-sm ${
      feedback.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
    }`}>
      {feedback.message}
    </div>
  )}
  
  <div className="space-y-4">
    {/* Player ID (non-editable) */}
    <div>
      <label className="block text-sm text-gray-400 mb-1">প্লেয়ার আইডি</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm cursor-not-allowed"
        value={userData?.player_id || 'N/A'}
        readOnly
      />
    </div>
    
    {/* Email (non-editable) */}
    <div>
      <label className="block text-sm text-gray-400 mb-1">ইমেইল</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm cursor-not-allowed"
        value={userData?.email || 'N/A'}
        readOnly
      />
    </div>
    
    {/* Username (editable) */}
    <div>
      <label className="block text-sm text-gray-400 mb-1">ব্যবহারকারীর নাম</label>
      <div className="flex gap-2">
        <input
          type="text"
          className={`flex-1 p-2 border rounded text-sm ${
            isEditingUsername 
              ? 'border-cyan-400 bg-gray-800 text-white' 
              : 'border-gray-600 bg-gray-800 text-white cursor-not-allowed'
          }`}
          value={editableUsername}
          onChange={(e) => setEditableUsername(e.target.value)}
          readOnly={!isEditingUsername}
        />
        {isEditingUsername ? (
          <>
            <button
              onClick={handleUsernameUpdate}
              className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
            >
              সংরক্ষণ
            </button>
            <button
              onClick={() => {
                setIsEditingUsername(false);
                setEditableUsername(userData?.username || '');
                setCurrentLoginPassword('');
              }}
              className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
            >
              বাতিল
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditingUsername(true)}
            className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
          >
            সম্পাদনা
          </button>
        )}
      </div>
    </div>

    {/* Password verification when editing username */}
    {isEditingUsername && (
      <div className="mt-2">
        <label className="block text-sm text-gray-400 mb-1">বর্তমান পাসওয়ার্ড</label>
        <div className="relative">
          <input
            type={showLoginPassword ? "text" : "password"}
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
            value={currentLoginPassword}
            onChange={(e) => setCurrentLoginPassword(e.target.value)}
            placeholder="পাসওয়ার্ড দিন"
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
        <p className="text-xs text-gray-500 mt-1">ব্যবহারকারীর নাম পরিবর্তন করতে আপনার বর্তমান পাসওয়ার্ড প্রয়োজন</p>
      </div>
    )}
  </div>
</div>
          </div>
        )}

        {selectedTab === 'নিরাপত্তা' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">অ্যাকাউন্ট নিরাপত্তা</h3>
            
            {/* Mobile Number Section */}
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow mb-6 border border-gray-600">
              <h4 className="font-medium mb-4 text-cyan-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                মোবাইল নম্বর
              </h4>
              {userData?.phone ? (
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded">
                  <div>
                    <p className="text-sm text-gray-400">আপনার মোবাইল নম্বর</p>
                    <p className="text-white font-medium">{formatMobileNumber(userData.phone)}</p>
                  </div>
                  <span className="bg-green-50 bg-opacity-20 text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    যাচাইকৃত
                  </span>
                </div>
              ) : (
                <>
                  {feedback.field === 'mobile' && (
                    <div className={`mb-3 p-3 rounded text-sm ${
                      feedback.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
                    }`}>
                      {feedback.message}
                    </div>
                  )}
                  <div className="bg-yellow-500 bg-opacity-10 border text-gray-700 border-yellow-500 border-opacity-30 p-3 rounded mb-4">
                    <p className="text-sm  flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      লেনদেনের জন্য আপনাকে আপনার মোবাইল নম্বর যোগ করতে হবে
                    </p>
                  </div>
                  <form onSubmit={handleAddMobile}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">মোবাইল নম্বর</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">+88</span>
                          </div>
                          <input
                            type="text"
                            className="w-full pl-12 p-2 border border-gray-600 rounded bg-gray-800 text-white text-sm"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="01688XXXXXXXX"
                            maxLength={11}
                            required
                          />
                        </div>
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
                            placeholder="6+ characters"
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
                            placeholder="Confirm password"
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
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        মোবাইল নম্বর সংরক্ষণ করুন
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'পাসওয়ার্ড আপডেট' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">পাসওয়ার্ড আপডেট করুন</h3>
            
            {/* Login Password Change */}
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow mb-6 border border-gray-600">
              <h4 className="font-medium mb-4 text-cyan-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                লগইন পাসওয়ার্ড পরিবর্তন করুন
              </h4>
              {feedback.field === 'loginPassword' && (
                <div className={`mb-3 p-3 rounded text-sm ${
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
                        placeholder="Current password"
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
                        placeholder="6+ characters"
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
                        placeholder="Confirm password"
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
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    পাসওয়ার্ড পরিবর্তন করুন
                  </button>
                </div>
              </form>
            </div>

            {/* Transaction Password Change */}
            {userData?.phone && (
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg shadow border border-gray-600">
                <h4 className="font-medium mb-4 text-cyan-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  লেনদেন পাসওয়ার্ড পরিবর্তন করুন
                </h4>
                {feedback.field === 'transactionPassword' && (
                  <div className={`mb-3 p-3 rounded text-sm ${
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
                          placeholder="Current password"
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
                          placeholder="6+ characters"
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
                          placeholder="Confirm password"
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
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      লেনদেন পাসওয়ার্ড পরিবর্তন করুন
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const DepositTabContent = () => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [selectedBonus, setSelectedBonus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, loading, error, fetchUserData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const amounts = [100, 300, 500, 1000, 3000, 5000, 10000, 20000, 25000, 30000];
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if user has mobile number
  const hasMobileNumber = userData?.phone;

  // Calculate account age in days
  const accountAgeInDays = userData?.createdAt 
    ? Math.floor((new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24))
    : 0;

  // Check if user is eligible for bonuses
  const isNewUser = accountAgeInDays < 3;
  const firstDepositBonusAvailable = userData?.bonusInfo?.firstDepositBonusClaimed === false;
  const depositBonusAvailable = userData?.total_deposit === 0 || 
    (userData?.bonusInfo?.activeBonuses?.length === 0 && isNewUser);

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

    if (amountNum < 100) {
      setErrorMessage('ন্যূনতম জমার পরিমাণ ১০০ টাকা');
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

    if (!/^\d+$/.test(amount)) {
      setErrorMessage('অর্থের পরিমাণ শুধুমাত্র সংখ্যা হতে হবে');
      return;
    }

    if ((firstDepositBonusAvailable || depositBonusAvailable) && !selectedBonus) {
      setErrorMessage('অনুগ্রহ করে একটি বোনাস অফার নির্বাচন করুন');
      return;
    }

    setIsSubmitting(true);

    try {
      // First create pending deposit record
      const initiateResponse = await axios.post(`${base_url}/user/initiate`, {
        method: selectedMethod || 'bkash',
        amount: amountNum || 0,
        bonusType: selectedBonus || 'none',
        userid: userData._id
      });

      if (initiateResponse.data.success && initiateResponse.data.redirectUrl) {
        setSuccessMessage('Payment initiated successfully! Redirecting...');
        // Redirect to payment gateway
        window.location.href = initiateResponse.data.redirectUrl;
      } else {
        setErrorMessage(initiateResponse.data.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      setErrorMessage(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle payment callback when returning from payment gateway
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentId = urlParams.get('paymentId');
      const status = urlParams.get('status');

      if (paymentId && status) {
        try {
          const response = await axios.get(`/api/deposit/status?paymentId=${paymentId}`);
          if (response.data.success) {
            setSuccessMessage('Deposit completed successfully!');
            fetchUserData(); // Refresh user data
          } else {
            setErrorMessage('Deposit failed or is still processing');
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
          setErrorMessage('Error verifying payment status');
        }
      }
    };

    checkPaymentStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
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
          onClick={() => window.location.href = '/profile'}
        >
          অ্যাকাউন্ট এডিট করুন
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 max-w-4xl mx-auto">
      {/* Bonus Information */}
      {isNewUser && (
        <div className="bg-gradient-to-r from-purple-800 to-blue-800 border border-cyan-400 p-3 rounded mb-4">
          <h3 className="font-bold text-lg text-white mb-2">🎉 বিশেষ বোনাস অফার! 🎉</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-blue-900/50 p-3 rounded border border-blue-400">
              <h4 className="font-medium text-cyan-300">প্রথম ডিপোজিট বোনাস</h4>
              <p className="text-white">৩% অতিরিক্ত বোনাস পাবেন আপনার প্রথম ডিপোজিটে</p>
              <p className="text-xs text-gray-300 mt-1">*শর্ত প্রযোজ্য</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded border border-purple-400">
              <h4 className="font-medium text-purple-300">বিশেষ ১৫০% বোনাস</h4>
              <p className="text-white">১৫০% বোনাস পাবেন ৩০x ওয়েজার সহ</p>
              <p className="text-xs text-gray-300 mt-1">*শুধুমাত্র নতুন ইউজারদের জন্য</p>
            </div>
          </div>
        </div>
      )}

      {/* Account Age Notice */}
      {isNewUser && (
        <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-400 p-3 rounded mb-4 text-sm">
          ⚠️ আপনার অ্যাকাউন্ট {accountAgeInDays} দিন পুরোনো। নতুন অ্যাকাউন্টের জন্য বিশেষ বোনাস অফার উপলব্ধ!
        </div>
      )}

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

      {/* Payment Method Selection */}
      <div className="mb-4">
        <label className="block font-medium mb-2">পেমেন্ট মেথড:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMethod('bkash')}
            className={`px-4 py-2 rounded border cursor-pointer ${
              selectedMethod === 'bkash' ? 'bg-cyan-500 border-cyan-500 text-gray-900' : 'bg-gray-700 border-gray-600'
            }`}
          >
            <div className="flex items-center">
              <img
                src="https://images.5949390294.com/mcs-images/bank_type/BKASH/BN_2_20240312225413337.png"
                alt="bkash"
                className="w-6 h-6 mr-2"
              />
              Bkash
            </div>
          </button>
          <button
            onClick={() => setSelectedMethod('nagad')}
            className={`px-4 py-2 cursor-pointer rounded border ${
              selectedMethod === 'nagad' ? 'bg-cyan-500 border-cyan-500 text-gray-900' : 'bg-gray-700 border-gray-600'
            }`}
          >
            <div className="flex items-center">
              <img
                src="https://images.5949390294.com/mcs-images/bank_type/NAGAD/BN_2_20240312230148421.png"
                alt="nagad"
                className="w-6 h-6 mr-2"
              />
              Nagad
            </div>
          </button>
        </div>
      </div>

      {/* Deposit Amount Section */}
      <div className="mb-4">
        <label className="block font-medium mb-2">জমার পরিমাণ:</label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-2">
          {amounts.map((amt) => (
            <button
              key={amt}
              onClick={() => {
                setAmount(amt.toString());
                setErrorMessage('');
              }}
              className={`bg-gray-700 cursor-pointer hover:bg-cyan-500 hover:text-gray-900 px-2 py-1 rounded text-sm text-center border ${
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
            if (value === '' || /^\d+$/.test(value)) {
              setAmount(value);
              setErrorMessage('');
            }
          }}
          className="mt-3 w-full p-2 border border-gray-600 rounded text-sm bg-gray-800 text-white"
          placeholder="জমার পরিমাণ লিখুন"
          min="100"
          max="30000"
        />
        <p className="text-sm text-gray-400 mt-1">
          সর্বনিম্ন পরিমাণ: ৳ 100, সর্বাধিক পরিমাণ: ৳ 30,000 <br />
          জমার সময়: 24/24
        </p>
      </div>

      {/* Bonus Selection */}
      {(firstDepositBonusAvailable || depositBonusAvailable) && (
        <div className="mb-4">
          <label className="block font-medium mb-2">বোনাস অফার নির্বাচন করুন:</label>
          <div className="space-y-2">
            {firstDepositBonusAvailable && (
              <div 
                className={`p-3 border rounded cursor-pointer ${selectedBonus === 'first-deposit' ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-800'}`}
                onClick={() => setSelectedBonus('first-deposit')}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    checked={selectedBonus === 'first-deposit'}
                    onChange={() => setSelectedBonus('first-deposit')}
                    className="mr-2"
                  />
                  <div>
                    <h4 className="font-medium">প্রথম ডিপোজিট বোনাস (৩%)</h4>
                    <p className="text-sm text-gray-400">আপনার প্রথম ডিপোজিটে ৩% অতিরিক্ত বোনাস পাবেন</p>
                  </div>
                </div>
              </div>
            )}
            
            {depositBonusAvailable && (
              <div 
                className={`p-3 border rounded cursor-pointer ${selectedBonus === 'special-bonus' ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-800'}`}
                onClick={() => setSelectedBonus('special-bonus')}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    checked={selectedBonus === 'special-bonus'}
                    onChange={() => setSelectedBonus('special-bonus')}
                    className="mr-2"
                  />
                  <div>
                    <h4 className="font-medium">বিশেষ ১৫০% বোনাস</h4>
                    <p className="text-sm text-gray-400">১৫০% বোনাস পাবেন ৩০x ওয়েজার সহ (শুধুমাত্র নতুন ইউজারদের জন্য)</p>
                  </div>
                </div>
              </div>
            )}
            
            <div 
              className={`p-3 border rounded cursor-pointer ${selectedBonus === 'no-bonus' ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-800'}`}
              onClick={() => setSelectedBonus('no-bonus')}
            >
              <div className="flex items-center">
                <input 
                  type="radio" 
                  checked={selectedBonus === 'no-bonus'}
                  onChange={() => setSelectedBonus('no-bonus')}
                  className="mr-2"
                />
                <div>
                  <h4 className="font-medium">কোন বোনাস নিবেন না</h4>
                  <p className="text-sm text-gray-400">আমি কোন বোনাস অফার নিতে চাই না</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button with Loading Animation */}
      <button 
        className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-2 px-4 rounded w-full text-lg flex justify-center items-center"
        onClick={handleDeposit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            প্রসেসিং...
          </>
        ) : 'জমার জন্য আবেদন করুন'}
      </button>

      {/* Terms and Conditions */}
      <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700 text-xs text-gray-400">
        <p className="font-medium mb-1 text-cyan-400">শর্তাবলী:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>সর্বনিম্ন ডিপোজিট পরিমাণ ১০০ টাকা</li>
          <li>যেকোনো অস্বাভাবিক লেনদেনের ক্ষেত্রে অ্যাকাউন্ট ব্লক করা হতে পারে</li>
          <li>বোনাসের শর্তাবলী প্রযোজ্য</li>
          <li>ডিপোজিট সম্পন্ন করতে ১-৫ মিনিট সময় লাগতে পারে</li>
        </ul>
      </div>

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
            {userData?.depositHistory?.length > 0 ? (
              [...userData.depositHistory]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((deposit, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-600">
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600">
                      {deposit.amount.toLocaleString()} ৳
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600">
                      {deposit.method}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600">
                      <span className={`px-2 py-1 rounded text-xs ${
                        deposit.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        deposit.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {deposit.status}
                      </span>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  কোন ডিপোজিট ইতিহাস পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
  const [cancelBonus, setCancelBonus] = useState(false);
  const { userData, loading: userLoading, error: userError, fetchUserData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Check if user has mobile number
  const hasMobileNumber = userData?.phone;
  
  // Calculate available balance after considering wagering requirements
  const calculateAvailableBalance = () => {
    let available = userData?.balance || 0;
    
    // If user has bonus and hasn't canceled it
    if (userData?.bonusBalance > 0 && !cancelBonus) {
      return 0; // Can't withdraw from main balance until bonus is cleared
    }
    
    // Check wagering requirements
    if (userData?.totalDeposits > 0) {
      const wageringRequirement = userData.totalDeposits * 3;
      const wageringCompleted = userData.totalWagered || 0;
      
      if (wageringCompleted < wageringRequirement) {
        // If they want to withdraw without completing, apply 20% commission
        return available * 0.8; // 20% commission
      }
    }
    
    return available;
  };
  
  const availableBalance = calculateAvailableBalance();
  const hasActiveBonus = userData?.bonusBalance > 0 && !cancelBonus;
  const needsWagering = userData?.totalDeposits > 0 && 
                       (userData.totalWagered || 0) < (userData.totalDeposits * 3);

  const handleWithdrawal = async () => {
    setError('');
    setSuccess('');
    
    // Validation
    if (!amount || amount < 300) {
      setError('ন্যূনতম উত্তোলন পরিমাণ ৳ ৩০০');
      return;
    }
    
    if (parseFloat(amount) > availableBalance) {
      setError(`আপনার পর্যাপ্ত ব্যালেন্স নেই। উত্তোলনযোগ্য ব্যালেন্স: ৳${availableBalance.toFixed(2)}`);
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
        payeeId: userData.id,
        payeeAccount: accountNumber,
        callbackUrl: `${window.location.origin}/withdrawal-callback`,
        amount: parseFloat(amount).toFixed(2),
        currency: "BDT",
        cancelBonus: cancelBonus,
        commissionApplied: needsWagering && (userData.totalWagered || 0) < (userData.totalDeposits * 3)
      };

      const response = await axios.post(`${base_url}/api/payment/payout`, payload, {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSuccess('উত্তোলন অনুরোধ সফলভাবে জমা হয়েছে। এটি প্রসেস হতে কিছু সময় লাগতে পারে।');
        // Reset form
        setAmount('');
        setAccountNumber('');
        setCancelBonus(false);
        // Refresh user data
        fetchUserData();
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
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">উত্তোলন</h3>
      
      {/* Warning Message */}
      <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 p-3 rounded mb-4 text-sm">
        ⚠️ উত্তোলনের ন্যূনতম পরিমাণ: ৳ 300 | উত্তোলনের সময়: সকাল ১০টা থেকে রাত ১০টা পর্যন্ত
      </div>

      {/* Balance Information */}
      <div className="bg-gray-700 p-3 rounded mb-4 border border-gray-600">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">মোট ব্যালেন্স:</span>
          <span className="font-medium">৳{(userData?.balance || 0).toFixed(2)}</span>
        </div>
        {userData?.bonusBalance > 0 && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">বোনাস ব্যালেন্স:</span>
            <span className="font-medium text-cyan-400">৳{userData.bonusBalance.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-400">উত্তোলনযোগ্য ব্যালেন্স:</span>
          <span className={`font-medium ${availableBalance > 0 ? 'text-green-400' : 'text-red-400'}`}>
            ৳{availableBalance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Bonus Warning */}
      {hasActiveBonus && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">
          ⚠️ আপনার অ্যাকাউন্টে সক্রিয় বোনাস রয়েছে (৳{userData.bonusBalance.toFixed(2)}). 
          বোনাস থাকা অবস্থায় উত্তোলন করা যাবে না। আপনি চাইলে বোনাস বাতিল করতে পারেন (১৫০% জরিমানা সহ)।
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="cancelBonus"
              checked={cancelBonus}
              onChange={(e) => setCancelBonus(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="cancelBonus">বোনাস বাতিল করুন (১৫০% জরিমানা)</label>
          </div>
          {cancelBonus && (
            <div className="mt-2 text-yellow-400">
              বোনাস বাতিল করলে আপনার ব্যালেন্স থেকে ৳{(userData.bonusBalance * 1.5).toFixed(2)} কেটে নেওয়া হবে।
            </div>
          )}
        </div>
      )}

      {/* Wagering Warning */}
      {needsWagering && (
        <div className="bg-purple-500/10 border border-purple-500 text-purple-400 p-3 rounded mb-4 text-sm">
          ⚠️ আপনার ডিপোজিটের ৩ গুণ ওয়েজার পূরণ হয়নি ({userData.totalWagered || 0}/{(userData.totalDeposits * 3).toFixed(2)}).
          ওয়েজার পূরণ না করেই উত্তোলন করলে ২০% কমিশন কাটা হবে।
          <div className="mt-2">
            বর্তমান উত্তোলনে প্রযোজ্য কমিশন: ৳{(parseFloat(amount || 0) * 0.2).toFixed(2)} 
            (নিট প্রাপ্তি: ৳{(parseFloat(amount || 0) * 0.8).toFixed(2)})
          </div>
        </div>
      )}

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
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">পরিমাণ (৳)</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            placeholder="উত্তোলন পরিমাণ লিখুন"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="300"
            step="100"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>ন্যূনতম উত্তোলন: ৳300</span>
            <span>সর্বোচ্চ উত্তোলন: ৳{availableBalance.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-4 py-2 rounded w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
          onClick={handleWithdrawal}
          disabled={!amount || amount < 300 || !accountNumber || loading || 
                   (hasActiveBonus && !cancelBonus) || 
                   parseFloat(amount || 0) > availableBalance}
        >
          {loading ? 'প্রসেস হচ্ছে...' : 'অনুরোধ করুন'}
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded shadow border border-gray-600">
        <h4 className="font-medium mb-2">উত্তোলন শর্তাবলী</h4>
        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
          <li>ন্যূনতম উত্তোলন পরিমাণ ৳৩০০</li>
          <li>প্রতিদিন সর্বোচ্চ ৩টি উত্তোলন অনুরোধ করা যাবে</li>
          <li>বোনাস থাকা অবস্থায় উত্তোলন করা যাবে না</li>
          <li>ডিপোজিটের ৩ গুণ ওয়েজার পূরণ না করলে ২০% কমিশন প্রযোজ্য</li>
          <li>বোনাস বাতিল করলে ১৫০% জরিমানা প্রযোজ্য</li>
          <li>উত্তোলন প্রসেসিং সময় ১০ মিনিট থেকে ২৪ ঘন্টা</li>
        </ul>
      </div>

      <div className="bg-gray-700 p-4 rounded shadow border border-gray-600 mt-4">
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

import { 
  FaCoins,
} from 'react-icons/fa';


const InviteFriendTabContent = () => {
  const [activeTab, setActiveTab] = useState('invite');
  const [copied, setCopied] = useState(false);
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userData, fetchUserData } = useUser();
const API_BASE_URL = import.meta.env.VITE_API_KEY_Base_URL;

  const referralLink = `${window.location.origin}/?refer_code=${userData?.referralCode || ''}`;

 useEffect(() => {
    if (userData?._id && (activeTab === 'list' || activeTab === 'reward')) {
      fetchReferralData();
    }
}, [activeTab, userData]);

const fetchReferralData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await axios.get(`${API_BASE_URL}/user/referred-users-details/${userData?._id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      // Add this to ensure you get JSON responses
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response); // Inspect the full response
    
    if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
      throw new Error('Received HTML instead of JSON - check API endpoint');
    }
    
    setReferralData(response.data.data);
  } catch (err) {
    console.error('API Error:', err);
    console.error('Error Response:', err.response);
    setError(err.response?.data?.message || 'Failed to fetch referral data');
  } finally {
    setLoading(false);
  }
};

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocialMedia = (platform) => {
    let url = '';
    const text = `Join ${window.location.hostname} with my referral link and get bonus: ${referralLink}`;
    
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2
    }).format(amount || 0).replace('BDT', '৳');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">বন্ধুর আমন্ত্রণ</h3>
      <div className="bg-gray-700 p-4 rounded shadow mb-4 border border-gray-600">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            className={`px-3 py-1 rounded text-sm cursor-pointer whitespace-nowrap flex items-center gap-1 ${activeTab === 'invite' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('invite')}
          >
            <FaUser size={12} /> আমন্ত্রণ
          </button>
          <button
            className={`px-3 py-1 rounded text-sm whitespace-nowrap cursor-pointer flex items-center gap-1 ${activeTab === 'list' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('list')}
          >
            <FaHistory size={12} /> আমন্ত্রিত তালিকা
          </button>
          <button
            className={`px-3 py-1 rounded text-sm whitespace-nowrap cursor-pointer flex items-center gap-1 ${activeTab === 'reward' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-800'}`}
            onClick={() => setActiveTab('reward')}
          >
            <FaCoins size={12} /> পুরস্কার
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
            <p className="mt-2 text-gray-400">লোড হচ্ছে...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {!loading && activeTab === 'invite' && (
          <div>
            <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="font-medium mb-2">আপনার রেফারেল লিঙ্ক</h4>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-600 rounded bg-gray-700 text-white text-sm"
                  value={referralLink}
                  readOnly
                />
                <button 
                  className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 px-3 py-2 rounded flex items-center gap-1 text-sm"
                  onClick={handleCopyLink}
                >
                  {copied ? <FaCheck /> : <FaCopy />} 
                  {copied ? 'কপি হয়েছে!' : 'কপি করুন'}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">সোশ্যাল মিডিয়ায় শেয়ার করুন</h4>
              <div className="flex gap-2">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  onClick={() => shareOnSocialMedia('facebook')}
                >
                  <FaFacebookF />
                </button>
                <button 
                  className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
                  onClick={() => shareOnSocialMedia('twitter')}
                >
                  <FaTwitter />
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                  onClick={() => shareOnSocialMedia('telegram')}
                >
                  <FaTelegramPlane />
                </button>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                  onClick={() => shareOnSocialMedia('whatsapp')}
                >
                  <FaWhatsapp />
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <h4 className="font-medium mb-2">আমন্ত্রণ নিয়ম</h4>
              <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম 100 টাকা ডিপোজিট করতে হবে</li>
                <li>আপনার আমন্ত্রিত বন্ধুকে ন্যূনতম 3টি বেট প্লেস করতে হবে</li>
                <li>আপনি পাবেন তাদের প্রথম ডিপোজিটের 25% বোনাস</li>
                <li>আপনার বন্ধু পাবেন 50 টাকা সাইনআপ বোনাস</li>
              </ul>
              
              <div className="mt-4 p-3 bg-gray-900 rounded border border-cyan-500/30">
                <h5 className="font-medium text-cyan-400 mb-1">রেফারেল ইনকাম ক্যালকুলেশন</h5>
                <p className="text-xs text-gray-300">
                  রেফারেল ইনকাম = (মোট ডিপোজিট − মোট উত্তোলন − বর্তমান ব্যালেন্স) × 25%<br />
                  <span className="text-gray-400">* এই হিসাবটি প্রতি সপ্তাহে একবার আপডেট করা হয়</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === 'list' && (
          <div className="overflow-x-auto border-[1px] border-gray-600">
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
                {referralData?.referredUsers?.length > 0 ? (
                  referralData.referredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/50">
                      <td className="py-3 px-4 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                            <FaUser size={12} />
                          </div>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-700 text-sm">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt size={12} className="text-gray-400" />
                          {formatDate(user.joinDate)}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.hasDeposited ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                        }`}>
                          {user.hasDeposited ? 'ডিপোজিট করেছেন' : 'ডিপোজিট করেনি'}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-700 font-medium">
                        {user.hasDeposited ? formatCurrency(100 * 0.25) : '৳ 0.00'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FaUser className="text-gray-600 mb-2" size={24} />
                        <p>কোন আমন্ত্রিত বন্ধু পাওয়া যায়নি</p>
                        <p className="text-sm mt-1">আপনার রেফারেল লিঙ্ক শেয়ার করে বন্ধুদের আমন্ত্রণ করুন</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && activeTab === 'reward' && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800 p-4 rounded shadow border border-gray-600">
                <p className="text-sm text-gray-400">মোট আমন্ত্রণ</p>
                <p className="text-xl font-bold text-cyan-400">
                  {referralData?.totalReferrals || 0}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded shadow border border-gray-600">
                <p className="text-sm text-gray-400">মোট পুরস্কার</p>
                <p className="text-xl font-bold text-cyan-400">
                  {formatCurrency(referralData?.referralEarnings || 0)}
                </p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-gray-900 rounded border border-cyan-500/30">
              <h5 className="font-medium text-cyan-400 mb-1">রেফারেল ইনকাম সারাংশ</h5>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">মোট ডিপোজিট</p>
                  <p>{formatCurrency(referralData?.totalDepositsByReferrals || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-400">মোট উত্তোলন</p>
                  <p>{formatCurrency(0)}</p>
                </div>
                <div>
                  <p className="text-gray-400">বর্তমান ব্যালেন্স</p>
                  <p>{formatCurrency(0)}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-sm">
                  <span className="text-gray-400">আপনার রেফারেল ইনকাম: </span>
                  <span className="font-bold">{formatCurrency(referralData?.referralEarnings || 0)}</span>
                  <span className="text-gray-500 text-xs"> (25% of {formatCurrency(referralData?.totalDepositsByReferrals || 0)})</span>
                </p>
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
                  {referralData?.referredUsers?.filter(u => u.hasDeposited).length > 0 ? (
                    referralData.referredUsers
                      .filter(u => u.hasDeposited)
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-gray-800/50">
                          <td className="py-3 px-4 border-b border-gray-700 text-sm">
                            {formatDate(user.joinDate)}
                          </td>
                          <td className="py-3 px-4 border-b border-gray-700">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                                <FaUser size={10} />
                              </div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-gray-700 font-medium">
                            {formatCurrency(100 * 0.25)}
                          </td>
                          <td className="py-3 px-4 border-b border-gray-700">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900/50 text-green-400">
                              Paid
                            </span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <FaCoins className="text-gray-600 mb-2" size={24} />
                          <p>কোন পুরস্কার রেকর্ড পাওয়া যায়নি</p>
                          <p className="text-sm mt-1">আপনার আমন্ত্রিত বন্ধুদের ডিপোজিটের পর পুরস্কার প্রদান করা হবে</p>
                        </div>
                      </td>
                    </tr>
                  )}
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