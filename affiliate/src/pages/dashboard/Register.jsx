import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Register = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    paymentMethod: 'bkash',
    paymentDetails: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const paymentMethods = [
    { value: 'bkash', label: 'Bkash' },
    { value: 'nagad', label: 'Nagad' },
    { value: 'rocket', label: 'Rocket' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'crypto', label: 'Crypto (USDT)' }
  ];

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendDisabled && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
      setResendTimer(60);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, resendTimer]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[3-9]\d{8}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Bangladeshi phone number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } 
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.paymentMethod !== 'bank' && !formData.paymentDetails.trim()) {
      newErrors.paymentDetails = 'Payment details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading('Processing registration...');

    try {
      const response = await axios.post(`${base_url}/api/affiliate/register`, formData);
      
      if (response.data.success) {
        toast.success('Registration successful! Please verify your email.', { id: toastId });
        
        // Store user data for OTP verification
        setUserData({
          email: formData.email,
          token: response.data.token,
          user: response.data.user
        });
        
        // Show OTP section
        setShowOTPSection(true);
        
        // Start resend timer
        setResendDisabled(true);
        
      } else {
        toast.error(response.data.message || 'Registration failed. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'An error occurred during registration.';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Validation error';
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
        } else if (error.response.status === 409) {
          errorMessage = 'Email already registered';
          setErrors({ email: 'Email already registered' });
        }
      }
      
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setVerifyingOTP(true);
    const toastId = toast.loading('Verifying OTP...');

    try {
      const response = await axios.post(`${base_url}/api/affiliate/verify-otp`, {
        email: userData.email,
        otp
      });

      if (response.data.success) {
        toast.success('Email verified successfully!', { id: toastId });
        
        // Store token and user data
        localStorage.setItem('affiliateToken', response.data.token);
        localStorage.setItem('affiliateUser', JSON.stringify(response.data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'OTP verification failed', { id: toastId });
        setOtpError(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      
      let errorMessage = 'Failed to verify OTP';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        
        if (error.response.status === 429) {
          // Handle OTP attempt limit exceeded
          setResendDisabled(true);
          setResendTimer(Math.ceil((error.response.data.retryAfter || 60) / 60));
        }
      }
      
      toast.error(errorMessage, { id: toastId });
      setOtpError(errorMessage);
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const toastId = toast.loading('Sending new OTP...');
    setResendDisabled(true);

    try {
      const response = await axios.post(`${base_url}/api/affiliate/request-otp`, {
        email: userData.email
      });

      if (response.data.success) {
        toast.success('New OTP sent to your email', { id: toastId });
        setOtp('');
        setOtpError('');
      } else {
        toast.error(response.data.message || 'Failed to resend OTP', { id: toastId });
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error.response?.data?.message || 'Failed to resend OTP', { id: toastId });
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (otpError && value.length === 6) {
      setOtpError('');
    }
  };

  const handleBackToRegistration = () => {
    setShowOTPSection(false);
    setOtp('');
    setOtpError('');
    setResendDisabled(false);
    setResendTimer(60);
  };

  return (
    <div className="min-h-screen flex items-center font-inter justify-center p-4 bg-gray-50">
      <Toaster 
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
            },
          },
          loading: {
            style: {
              background: '#333',
              color: 'white',
            },
          },
        }}
      />
      
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-indigo-700 w-[130px] h-[130px] rounded-full">
              <img 
                src={logo}
                alt="Company Logo" 
                className=" "
              />
            </div>
          </div>
          
          {showOTPSection ? (
            /* OTP Verification Section */
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                {/* <button
                  onClick={handleBackToRegistration}
                  className="mr-2 text-gray-500 hover:text-gray-700"
                >
                  <FaArrowLeft className="text-xl" />
                </button> */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Verify Your Email</h2>
                  <p className="text-gray-500">Enter the 6-digit code sent to {userData?.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    className={`w-full px-3 py-2 border ${otpError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                    placeholder="Enter 6-digit OTP"
                    inputMode="numeric"
                    pattern="\d{6}"
                  />
                  {otpError && <p className="mt-1 text-xs text-red-600">{otpError}</p>}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className={`text-theme_color ${resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                  >
                    {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>
                
                <button
                  onClick={handleVerifyOTP}
                  disabled={verifyingOTP || otp.length !== 6}
                  className="w-full bg-theme_color text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-70"
                >
                  {verifyingOTP ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : 'Verify Email'}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
                <p className="text-gray-500 mt-1">Join our affiliate program</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                      placeholder="Enter Name"
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                      placeholder="Enter Email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                        placeholder="Password (min 8 chars)"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <div className="relative">
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent appearance-none"
                      >
                        {paymentMethods.map((method) => (
                          <option key={method.value} value={method.value}>{method.label}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <FaChevronDown className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details (full width) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.paymentMethod === 'bank' ? 'Bank Details' : 
                     formData.paymentMethod === 'crypto' ? 'USDT Address' : 
                     `${formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1)} Number`}
                  </label>
                  <input
                    type="text"
                    name="paymentDetails"
                    value={formData.paymentDetails}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.paymentDetails ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                    placeholder={
                      formData.paymentMethod === 'bank' ? 'Bank name, account number, branch' : 
                      formData.paymentMethod === 'crypto' ? 'USDT TRC20 address' : 
                      `Enter ${formData.paymentMethod} number`
                    }
                  />
                  {errors.paymentDetails && <p className="mt-1 text-xs text-red-600">{errors.paymentDetails}</p>}
                  {formData.paymentMethod === 'bkash' && (
                    <p className="mt-1 text-xs text-gray-500">Example: 01XXXXXXXXX</p>
                  )}
                  {formData.paymentMethod === 'crypto' && (
                    <p className="mt-1 text-xs text-gray-500">Make sure to use TRC20 network</p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-theme_color focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-700">
                      I agree to the <a href="#" className="text-theme_color hover:underline">terms and conditions</a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-theme_color cursor-pointer hover:bg-theme_color text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Register'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <NavLink to="/login" className="text-blue-600 font-medium hover:underline">Sign in</NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;