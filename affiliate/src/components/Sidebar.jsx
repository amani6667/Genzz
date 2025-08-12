import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { IoHomeOutline } from "react-icons/io5";
import { FaChartLine, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    // Set initial open menu based on current path
    if (location.pathname.startsWith('/dashboard')) {
      setOpenMenu(null);
    } else if (location.pathname.startsWith('/statistics')) {
      setOpenMenu('stats');
    } else if (location.pathname.startsWith('/players')) {
      setOpenMenu('players');
    } else if (location.pathname.startsWith('/withdraw')) {
      setOpenMenu('withdraw');
    }
  }, []);

  const handleToggle = (menu) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <aside
      className={`transition-all duration-300 fixed w-[70%] md:w-[30%] lg:w-[20%] xl:w-[17%] h-full z-[999] border-r border-indigo-900 text-sm shadow-lg pt-[12vh] p-4 ${
        isOpen ? 'left-0 top-0' : 'left-[-120%] top-0'
      } bg-gradient-to-b from-indigo-950 to-indigo-900 text-white`}
    >
      {/* Dashboard - Always visible */}
      <div className="mb-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
              isActive
                ? 'bg-indigo-700 text-white font-semibold shadow'
                : 'hover:bg-indigo-800 hover:text-white text-indigo-200'
            }`
          }
        >
          <span className="flex items-center gap-2">
            <IoHomeOutline className="text-[18px]" />
            Dashboard
          </span>
        </NavLink>
      </div>

      {/* Statistics Section */}
      {/* <div className="mb-3">
        <div
          onClick={() => handleToggle('stats')}
          className={`flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
            openMenu === 'stats'
              ? 'bg-indigo-700 text-white font-semibold shadow'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <FaChartLine className="text-[18px]" />
            Statistics
          </span>
          <FiChevronRight
            className={`transition-transform duration-300 ${
              openMenu === 'stats' ? 'rotate-90' : ''
            }`}
          />
        </div>
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ${
            openMenu === 'stats' ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <NavLink
            to="/statistics/overview"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/statistics/traffic"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Traffic
          </NavLink>
        </div>
      </div> */}

      {/* Players Section */}
      <div className="mb-3">
        <div
          onClick={() => handleToggle('players')}
          className={`flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
            openMenu === 'players'
              ? 'bg-indigo-700 text-white font-semibold shadow'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <FaUsers className="text-[18px]" />
            Players
          </span>
          <FiChevronRight
            className={`transition-transform duration-300 ${
              openMenu === 'players' ? 'rotate-90' : ''
            }`}
          />
        </div>
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ${
            openMenu === 'players' ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <NavLink
            to="/players/all"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            All Players
          </NavLink>
          <NavLink
            to="/players/active"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Active Players
          </NavLink>
        </div>
      </div>

      {/* Withdrawal Section - New addition */}
      <div className="mb-3">
        <div
          onClick={() => handleToggle('withdraw')}
          className={`flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
            openMenu === 'withdraw'
              ? 'bg-indigo-700 text-white font-semibold shadow'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <MdOutlinePayments className="text-[18px]" />
            Withdraw
          </span>
          <FiChevronRight
            className={`transition-transform duration-300 ${
              openMenu === 'withdraw' ? 'rotate-90' : ''
            }`}
          />
        </div>
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ${
            openMenu === 'withdraw' ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <NavLink
            to="/withdraw/request"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Request Withdrawal
          </NavLink>
          <NavLink
            to="/withdraw/history"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Withdrawal History
          </NavLink>
          <NavLink
            to="/withdraw/methods"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Payment Methods
          </NavLink>
        </div>
      </div>

      {/* Settings */}
      <div className="mb-3 mt-8 border-t border-indigo-800 pt-4">
        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
              isActive
                ? 'bg-indigo-700 text-white font-semibold shadow'
                : 'hover:bg-indigo-800 hover:text-white text-indigo-200'
            }`
          }
        >
          <span className="flex items-center gap-2">
            <IoSettingsOutline className="text-[18px]" />
            Settings
          </span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;