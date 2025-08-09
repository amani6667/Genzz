import React, { useState } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi'; // Importing back arrow icon from react-icons
import { useNavigate } from 'react-router-dom'; // For navigation
import { useUser } from '../../context/UserContext';
import { MdArrowBackIosNew } from "react-icons/md";
const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { userData, loading: userLoading, error: userError, fetchUserData } = useUser();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const navigate = useNavigate();

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
    return (
      <div className="min-h-screen bg-gray-900 text-center py-4 text-white">
        লোড হচ্ছে...
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen bg-gray-900 text-center py-4 text-red-500">
        ব্যবহারকারী ডেটা লোড করতে সমস্যা হয়েছে
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-anek">
      {/* Header */}
      <div className="bg-gray-800 py-2 px-2 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-700 mr-4"
          >
            <MdArrowBackIosNew className="text-xl" />
          </button>
          <h1 className="text-[18px] font-[600]">উত্তোলন</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto py-6 px-4">
        {!hasMobileNumber ? (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
            <div className="p-4 rounded mb-4">
              <h3 className="font-bold text-lg">দয়া করে মোবাইল নাম্বার যোগ করুন</h3>
              <p className="mt-2 text-gray-400">উত্তোলন করার জন্য আপনাকে প্রথমে অ্যাকাউন্ট একটি মোবাইল নাম্বার যোগ করতে হবে</p>
            </div>
            <button 
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 py-2 px-6 rounded text-lg"
              onClick={() => navigate('/profile')}
            >
              অ্যাকাউন্ট এডিট করুন
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
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
        )}
      </div>
    </div>
  );
};

export default Withdraw;