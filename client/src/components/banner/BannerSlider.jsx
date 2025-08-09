import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaBell, FaGift } from 'react-icons/fa';
import { FaLock } from "react-icons/fa";
import Mainpagegame from '../games/Mainpagegame';
import CategorySlider from '../category/CategorySlider';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import NoticeMarquee from './NoticeMarquee';
import { FaWallet, FaMoneyBill } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Fetch banner data from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${base_url}/api/all-sliders`);
        if (response.data) {
          setBanners(response.data.data[0].filenames || []);
        } else {
          setError("Failed to fetch banners");
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Error loading banners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center sm:px-4 px-2">
        <section className='w-full md:w-[80%]'>
          <div className="flex w-full rounded-xl h-[150px] sm:h-[250px] md:h-[400px] bg-gray-200 animate-pulse"></div>
        </section>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex justify-center items-center sm:px-4 px-2">
        <section className='w-full md:w-[80%]'>
          <div className="flex w-full rounded-xl h-[150px] sm:h-[250px] md:h-[400px] bg-gray-200 items-center justify-center text-red-500">
            {error}
          </div>
        </section>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section className="w-full flex justify-center items-center sm:px-4 px-2">
        <section className='w-full md:w-[80%]'>
          <div className="flex w-full rounded-xl h-[150px] sm:h-[250px] md:h-[400px] bg-gray-200 items-center justify-center">
            No banners available
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="w-full flex justify-center items-center sm:px-4 px-2">
      <section className='w-full md:w-[95%]'>
        {/* Banner Slider */}
        <div className="flex w-full md:rounded-xl h-[180px] sm:h-[250px] md:h-[400px] overflow-hidden relative group">
          {banners.map((img, index) => (
            <img
              key={index}
              src={`${base_url}/images/${img}`} // Adjust this path according to your server setup
              alt={`slide-${index}`}
              className={`transition-all duration-500 w-full object-cover rounded-[5px] md:rounded-xl ${index === current ? 'block' : 'hidden'}`}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/800x400?text=Banner+Image";
              }}
            />
          ))}
          
          {/* Left Arrow - Smaller on mobile */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-black/90 cursor-pointer hover:bg-black/70 p-2 sm:p-3 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={prevSlide}
          >
            <IoIosArrowBack className="text-sm sm:text-lg" />
          </button>
          
          {/* Right Arrow - Smaller on mobile */}
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer bg-black/90 hover:bg-black/70 p-2 sm:p-3 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={nextSlide}
          >
            <IoIosArrowForward className="text-sm sm:text-lg" />
          </button>
          
          {/* Dots - Smaller on mobile */}
          <div className="absolute bottom-2 sm:bottom-4 w-full flex justify-center gap-1 sm:gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1 sm:h-2 w-4 sm:w-8 cursor-pointer rounded-full transition-all duration-300 ${current === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Bottom Notification - Improved for mobile */}
       <NoticeMarquee/>
        
        {/* Action Buttons - 3D Style */}
<div className="flex justify-center gap-4 sm:gap-6 mt-4 mb-2 md:hidden">
  <NavLink 
    to="/deposit" 
    className="relative px-4 sm:px-6 py-3 sm:py-3 w-[50%] cursor-pointer bg-gray-900 text-[15px] hover:bg-gray-800 text-emerald-400 font-medium rounded-[5px] transition-colors duration-200 border border-gray-700 flex items-center justify-center gap-2"
  >
    {/* <FaWallet className="text-xs sm:text-sm" /> */}
    <span className="text-[14px]">ডিপোজিট</span>
  </NavLink>
  
  <NavLink 
    to="/withdraw" 
    className="relative px-4 sm:px-6 py-3 sm:py-3 w-[50%] cursor-pointer text-[15px] bg-gray-900 hover:bg-gray-800 text-blue-400 font-medium rounded-[5px] transition-colors duration-200 border border-gray-700 flex items-center justify-center gap-2"
  >
    {/* <FaMoneyBill className="text-[15px] sm:text-sm" /> */}
    <span className="text-[14px]">উইথড্র</span>
  </NavLink>
</div>
        
        {/* <CategorySlider/> */}
        <Mainpagegame/>
      </section>
    </section>
  );
};

export default BannerSlider;