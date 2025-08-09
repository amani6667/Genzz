import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [activeProvider, setActiveProvider] = useState('bkash');
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, loading, error, fetchUserData } = useUser();
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const amounts = [300, 500, 1000, 3000, 5000, 10000, 20000, 25000, 30000];
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const hasMobileNumber = userData?.phone;

  const handleDeposit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

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
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 max-w-md mx-auto text-center">
          <h3 className="text-red-400 font-medium">Error loading user data</h3>
          <p className="text-gray-400 mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen font-anek">
      {/* Header - Always shown */}
      <header className="bg-gray-800 border-b border-gray-700 py-4 px-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full text-cyan-500 hover:bg-gray-700 transition-colors"
          >
            <MdArrowBackIosNew/>
          </button>
          <h1 className="text-[18px] font-[600] text-gray-200">ডিপোজিট</h1>
        </div>
      </header>

      {!hasMobileNumber ? (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-xl mb-2">মোবাইল নাম্বার প্রয়োজন</div>
              <p className="text-gray-400 text-sm mb-6">
                ডিপোজিট করার জন্য আপনাকে প্রথমে অ্যাকাউন্ট একটি মোবাইল নাম্বার যোগ করতে হবে
              </p>
            </div>
            <div className="text-center">
              <button 
                className="bg-gradient-to-r from-cyan-500 cursor-pointer to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-gray-900 font-bold py-2 px-6 rounded-lg transition duration-200"
                onClick={() => navigate('/profile')}
              >
                অ্যাকাউন্ট এডিট করুন
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Payment Methods Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-bold text-lg text-gray-200">পেমেন্ট পদ্ধতি</h3>
                </div>
                <div className="p-3 space-y-3">
                  <div
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeProvider === 'bkash' 
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-gray-900 shadow-lg' 
                        : 'bg-gray-700 hover:bg-gray-700/80'
                    }`}
                    onClick={() => {
                      setActiveProvider('bkash');
                      setSelectedMethod('bkash');
                    }}
                  >
                    <img
                      src="https://images.5949390294.com/mcs-images/bank_type/BKASH/BN_2_20240312225413337.png"
                      alt="bkash"
                      className="w-10 h-10 mr-3"
                    />
                    <span className="font-semibold">Bkash VIP</span>
                  </div>

                  <div
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeProvider === 'nagad' 
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-gray-900 shadow-lg' 
                        : 'bg-gray-700 hover:bg-gray-700/80'
                    }`}
                    onClick={() => {
                      setActiveProvider('nagad');
                      setSelectedMethod('nagad');
                    }}
                  >
                    <img
                      src="https://images.5949390294.com/mcs-images/bank_type/NAGAD/BN_2_20240312230148421.png"
                      alt="nagad"
                      className="w-10 h-10 mr-3"
                    />
                    <span className="font-semibold">Nagad VIP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full lg:w-3/4">
              {/* Warning Alert */}
              <div className="bg-gray-800 border border-cyan-500/50 rounded-xl p-4 mb-6 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-cyan-400 text-xl mr-3">⚠️</div>
                  <div>
                    <h4 className="font-bold text-cyan-400 mb-1">গুরুত্বপূর্ণ নোট</h4>
                    <p className="text-gray-300 text-sm">
                      অনুগ্রহ করে আপনার ডিপোজিট করার পরে অবশ্যই আপনার Trx-ID আইডি সাবমিট করবেন। 
                      তাহলে খুব দ্রুত আপনার একাউন্টের মধ্যে টাকা যোগ হয়ে যাবে।
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              {errorMessage && (
                <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 mb-6">
                  <div className="flex items-center text-red-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-900/20 border border-green-700 rounded-xl p-4 mb-6">
                  <div className="flex items-center text-green-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{successMessage}</span>
                  </div>
                </div>
              )}

              {/* Deposit Form */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-200 mb-6">ডিপোজিট ফর্ম</h3>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-gray-300 font-medium mb-3">জমার পরিমাণ:</label>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setAmount(amt.toString());
                          setErrorMessage('');
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          amount === amt.toString() 
                            ? 'bg-cyan-600 text-gray-900 shadow-md' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {amt.toLocaleString()} ৳
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative">
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
                      className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="জমার পরিমাণ লিখুন"
                    />
                    <div className="absolute left-3 top-3 text-gray-400">
                      ৳
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    সর্বনিম্ন পরিমাণ: ৳ 300, সর্বাধিক পরিমাণ: ৳ 30,000 | জমার সময়: 24/24
                  </p>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-gray-300 font-medium mb-3">প্রদান পদ্ধতি নির্বাচন করুন:</label>
                  <select
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  >
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-gray-900 shadow-lg hover:shadow-cyan-500/20'
                  }`}
                  onClick={handleDeposit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'জমার জন্য আবেদন করুন'
                  )}
                </button>
              </div>

              {/* Deposit History */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-bold text-lg text-gray-200">ডিপোজিট ইতিহাস</h3>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700 text-gray-300">
                        <tr>
                          <th className="py-3 px-4 text-left">তারিখ</th>
                          <th className="py-3 px-4 text-left">পরিমাণ</th>
                          <th className="py-3 px-4 text-left">পদ্ধতি</th>
                          <th className="py-3 px-4 text-left">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-gray-500">
                            <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2">কোন ডিপোজিট ইতিহাস পাওয়া যায়নি</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;