import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Login = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem('affiliateToken') || sessionStorage.getItem('affiliateToken');
  //   if (token) {
  //     navigate('/affiliate/dashboard');
  //   }
  // }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
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
    const toastId = toast.loading('Authenticating...');

    try {
      const response = await axios.post(`${base_url}/api/affiliate/login`, {
        email: loginData.email,
        password: loginData.password
      });
      
      if (response.data.success) {
        toast.success('Login successful!', { id: toastId });
        
        // Store authentication tokens
        const { token, user } = response.data;
        
        if (rememberMe) {
          // Store in localStorage for persistent login
          localStorage.setItem('affiliateToken', token);
          localStorage.setItem('affiliateUser', JSON.stringify(user));
        } else {
          // Store in sessionStorage for session-only login
          sessionStorage.setItem('affiliateToken', token);
          sessionStorage.setItem('affiliateUser', JSON.stringify(user));
        }
        
        // Set default axios authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Redirect based on user status
        if (user.isVerified) {
          navigate('/dashboard');
        } else {
          navigate('/affiliate/verify-email');
        }
      } else {
        toast.error(response.data.message || 'Login failed. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'An error occurred during login';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
          setErrors({
            email: 'Invalid credentials',
            password: 'Invalid credentials'
          });
        } else if (error.response.status === 403) {
          errorMessage = 'Account not verified. Please check your email.';
          // Optionally redirect to verification page
          navigate('/affiliate/verify-email');
        } else if (error.response.status === 429) {
          errorMessage = 'Too many attempts. Please try again later.';
        }
      }
      
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
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
            duration: 2000,
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
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-indigo-700 w-[100px] h-[100px] rounded-full">
              <img 
                src={logo}
                alt="Company Logo" 
                className=""
              />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Login to Your Account</h2>
            <p className="text-gray-500 mt-1">Access your affiliate dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                placeholder="Enter Email"
                autoComplete="username"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-theme_color focus:border-transparent`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-theme_color focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link 
                to="/affiliate/forgot-password" 
                className="text-sm text-theme_color hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-theme_color text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-theme_color font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;