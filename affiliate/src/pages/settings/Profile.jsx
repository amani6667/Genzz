import React, { useState, useEffect } from 'react';
import { 
  FaDollarSign, 
  FaUsers, 
  FaChartLine, 
  FaPercentage, 
  FaExchangeAlt,
  FaRegClock,
  FaRegUserCircle,
  FaCopy,
  FaQrcode,
  FaShareAlt,
  FaEdit,
  FaHistory,
  FaMoneyBillWave,
  FaLock,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Profile = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [affiliateData, setAffiliateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [editData, setEditData] = useState({
    fullName: '',
    phone: '',
    paymentMethod: '',
    paymentDetails: ''
  });
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Sample data for charts (replace with real data from API)
  const performanceData = [
    { name: 'Jan', clicks: 4000, signups: 2400, earnings: 2400 },
    { name: 'Feb', clicks: 3000, signups: 1398, earnings: 2210 },
    { name: 'Mar', clicks: 2000, signups: 9800, earnings: 2290 },
    { name: 'Apr', clicks: 2780, signups: 3908, earnings: 2000 },
    { name: 'May', clicks: 1890, signups: 4800, earnings: 2181 },
    { name: 'Jun', clicks: 2390, signups: 3800, earnings: 2500 },
    { name: 'Jul', clicks: 3490, signups: 4300, earnings: 2100 },
  ];

  const referralSources = [
    { name: 'Social Media', value: 35 },
    { name: 'Direct Links', value: 25 },
    { name: 'Email', value: 20 },
    { name: 'Others', value: 20 },
  ];

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${base_url}/api/affiliate-user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('affiliateToken') || sessionStorage.getItem('affiliateToken')}`
          }
        });
        
        if (response.data.success) {
          setAffiliateData(response.data.profile);
          setEditData({
            fullName: response.data.profile.fullName,
            phone: response.data.profile.phone,
            paymentMethod: response.data.profile.paymentMethod,
            paymentDetails: response.data.profile.paymentDetails
          });
        } else {
          toast.error('Failed to fetch profile data');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching affiliate data:', error);
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateData();
  }, [navigate]);

  const handleCopyReferralCode = () => {
    if (affiliateData?.referralCode) {
      const referralUrl = `http://localhost:5173/register?refer_code=${affiliateData.referralCode}`;
      navigator.clipboard.writeText(referralUrl);
      toast.success('Referral link copied to clipboard!');
    }
  };

  const handleShareReferral = () => {
    if (affiliateData?.referralCode) {
      const shareUrl = `http://localhost:5173/register?refer_code=${affiliateData.referralCode}`;
      if (navigator.share) {
        navigator.share({
          title: 'Join with my referral code',
          text: `Use my referral link to get bonus: ${shareUrl}`,
          url: shareUrl,
        })
        .catch(err => console.log('Error sharing:', err));
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Referral link copied to clipboard!');
      }
    }
  };

  const handleWithdrawal = async () => {
    if (!withdrawalAmount || isNaN(withdrawalAmount) || parseFloat(withdrawalAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(withdrawalAmount) < 500) {
      toast.error('Minimum withdrawal amount is 500 BDT');
      return;
    }

    if (parseFloat(withdrawalAmount) > (affiliateData?.balance || 0)) {
      toast.error('Insufficient balance');
      return;
    }

    try {
      const response = await axios.post(`${base_url}/api/affiliate-user/withdraw`, {
        amount: parseFloat(withdrawalAmount)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('affiliateToken') || sessionStorage.getItem('affiliateToken')}`
        }
      });

      if (response.data.success) {
        toast.success('Withdrawal request submitted successfully!');
        setWithdrawalAmount('');
        // Refresh data
        const updatedResponse = await axios.get(`${base_url}/api/affiliate-user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('affiliateToken') || sessionStorage.getItem('affiliateToken')}`
          }
        });
        setAffiliateData(updatedResponse.data.profile);
      } else {
        toast.error(response.data.message || 'Withdrawal failed');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    }
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(`${base_url}/api/affiliate-user/profile`, editData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('affiliateToken') || sessionStorage.getItem('affiliateToken')}`
        }
      });

      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setAffiliateData(response.data.profile);
        setIsEditing(false);
      } else {
        toast.error(response.data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New password and confirmation don't match");
        return;
      }

      if (passwordData.newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

      const response = await axios.put(`${base_url}/api/affiliate-user/update-password`, passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('affiliateToken') || sessionStorage.getItem('affiliateToken')}`
        }
      });

      if (response.data.success) {
        toast.success('Password updated successfully!');
        setIsPasswordEditing(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(response.data.message || 'Password update failed');
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast.error(error.response?.data?.message || 'Password update failed');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  if (isLoading) {
    return (
      <section className="font-inter h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </section>
    );
  }

  if (!affiliateData) {
    return (
      <section className="font-inter h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load profile data</p>
          <button 
            onClick={() => navigate('/affiliate/login')}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="font-inter h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex pt-[10vh] h-[90vh]">
        <Sidebar isOpen={isSidebarOpen} activeTab="profile" />

        <main
          className={`transition-all duration-300 flex-1 p-6 overflow-y-auto h-[90vh] ${
            isSidebarOpen ? 'ml-[17%]' : 'ml-0'
          }`}
        >
          <div className="w-full mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center shadow-inner">
                  <FaRegUserCircle className="text-5xl text-indigo-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{affiliateData.fullName}</h1>
                      <p className="text-gray-600">{affiliateData.email}</p>
                      <p className="text-gray-600">{affiliateData.phone}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
                      >
                        <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
                      </button>
                      <button 
                        onClick={() => navigate('/affiliate/history')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <FaHistory /> History
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Balance</p>
                    <h3 className="text-2xl font-bold">{affiliateData.balance?.toFixed(2) || '0.00'} BDT</h3>
                  </div>
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-500">
                    <FaDollarSign className="text-xl" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Total Earned</p>
                    <h3 className="text-2xl font-bold">{affiliateData.totalEarned?.toFixed(2) || '0.00'} BDT</h3>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 text-green-500">
                    <FaChartLine className="text-xl" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Referrals</p>
                    <h3 className="text-2xl font-bold">{affiliateData.referralCount || 0}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                    <FaUsers className="text-xl" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Conversion Rate</p>
                    <h3 className="text-2xl font-bold">
                      {affiliateData.referralCount > 0 
                        ? `${((affiliateData.referralCount / 100) * 100).toFixed(1)}%` 
                        : '0%'}
                    </h3>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                    <FaPercentage className="text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'referrals' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Referrals
                </button>
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'withdraw' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Withdraw
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Settings
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              {activeTab === 'overview' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
                    <div className="h-80 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              border: 'none'
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="clicks" 
                            stroke="#6366F1" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="signups" 
                            stroke="#10B981" 
                            strokeWidth={2}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="earnings" 
                            stroke="#F59E0B" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Referral Sources</h3>
                      <div className="h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={referralSources}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {referralSources.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: 'none'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Earnings</h3>
                      <div className="h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={performanceData.slice().reverse().slice(0, 6)}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: 'none'
                              }}
                            />
                            <Legend />
                            <Bar 
                              dataKey="earnings" 
                              fill="#6366F1" 
                              name="Earnings (BDT)" 
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'referrals' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Referral Link</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                        <span className="font-mono text-sm break-all">
                          http://localhost:5173/register?refer_code={affiliateData.referralCode}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={handleCopyReferralCode}
                            className="p-2 text-gray-600 hover:text-indigo-500 transition-colors"
                            title="Copy link"
                          >
                            <FaCopy />
                          </button>
                          <button 
                            onClick={handleShareReferral}
                            className="p-2 text-gray-600 hover:text-indigo-500 transition-colors"
                            title="Share"
                          >
                            <FaShareAlt />
                          </button>
                        </div>
                      </div>
                      <button 
                        className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                        onClick={() => {
                          // QR code functionality would go here
                          toast.success('QR code generated!');
                        }}
                      >
                        <FaQrcode className="text-xl" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Share your referral link with friends and earn commissions when they sign up!
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Referrals</h3>
                    {affiliateData.referrals?.length > 0 ? (
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joined
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Earned
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {affiliateData.referrals.map((referral, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {referral.fullName || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {referral.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(referral.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${referral.isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {referral.isActive ? 'Active' : 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                  {referral.earned?.toFixed(2) || '0.00'} BDT
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">You don't have any referrals yet.</p>
                        <p className="text-gray-500">Share your referral link to start earning!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'withdraw' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Withdraw Funds</h3>
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-indigo-100 text-indigo-500">
                          <FaMoneyBillWave className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Available Balance</h4>
                          <p className="text-2xl font-bold">{affiliateData.balance?.toFixed(2) || '0.00'} BDT</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Minimum withdrawal amount: 500 BDT. Withdrawals are processed within 24-48 hours.
                      </p>
                    </div>

                    <div className="max-w-md">
                      <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                          Amount to Withdraw (BDT)
                        </label>
                        <input
                          type="number"
                          id="amount"
                          value={withdrawalAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter amount"
                          min="500"
                          max={affiliateData.balance}
                          step="1"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Method
                        </label>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <p className="font-medium">{affiliateData.paymentMethod}</p>
                          <p className="text-gray-600">{affiliateData.paymentDetails}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Update your payment method in Settings if needed
                        </p>
                      </div>

                      <button
                        onClick={handleWithdrawal}
                        disabled={!withdrawalAmount || parseFloat(withdrawalAmount) < 500 || parseFloat(withdrawalAmount) > affiliateData.balance}
                        className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Request Withdrawal
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Withdrawal History</h3>
                    {affiliateData.withdrawals?.length > 0 ? (
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Method
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction ID
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {affiliateData.withdrawals.map((withdrawal, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(withdrawal.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {withdrawal.amount.toFixed(2)} BDT
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {withdrawal.method}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    withdrawal.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {withdrawal.transactionId || 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No withdrawal history yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  {isEditing ? (
                    <div className="max-w-md space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={editData.fullName}
                          onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Method
                        </label>
                        <select
                          id="paymentMethod"
                          value={editData.paymentMethod}
                          onChange={(e) => setEditData({...editData, paymentMethod: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="bkash">bKash</option>
                          <option value="nagad">Nagad</option>
                          <option value="rocket">Rocket</option>
                          <option value="bank">Bank Transfer</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Details (Account Number)
                        </label>
                        <input
                          type="text"
                          id="paymentDetails"
                          value={editData.paymentDetails}
                          onChange={(e) => setEditData({...editData, paymentDetails: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleEditProfile}
                          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : isPasswordEditing ? (
                    <div className="max-w-md space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.current ? "text" : "password"}
                            id="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('current')}
                          >
                            {showPassword.current ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.new ? "text" : "password"}
                            id="newPassword"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                      onClick={() => togglePasswordVisibility('new')}
                          >
                            {showPassword.new ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.confirm ? "text" : "password"}
                            id="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('confirm')}
                          >
                            {showPassword.confirm ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handlePasswordUpdate}
                          disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => setIsPasswordEditing(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Personal Information</h4>
                        <div className="mt-2 space-y-2">
                          <p className="text-gray-900">
                            <span className="font-medium">Name:</span> {affiliateData.fullName}
                          </p>
                          <p className="text-gray-900">
                            <span className="font-medium">Email:</span> {affiliateData.email}
                          </p>
                          <p className="text-gray-900">
                            <span className="font-medium">Phone:</span> {affiliateData.phone}
                          </p>
                          <p className="text-gray-900">
                            <span className="font-medium">Member Since:</span> {new Date(affiliateData.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-900">
                            <span className="font-medium">Last Login:</span> {new Date(affiliateData.lastLogin).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Payment Information</h4>
                        <div className="mt-2 space-y-2">
                          <p className="text-gray-900">
                            <span className="font-medium">Method:</span> {affiliateData.paymentMethod}
                          </p>
                          <p className="text-gray-900">
                            <span className="font-medium">Details:</span> {affiliateData.paymentDetails}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Security</h4>
                        <div className="mt-2 space-y-3">
                          <button
                            onClick={() => setIsPasswordEditing(true)}
                            className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 text-sm font-medium"
                          >
                            <FaLock /> Change Password
                          </button>
                          <p className="text-sm text-gray-500">
                            Last updated: {new Date(affiliateData.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;