import React, { useState, useEffect } from 'react';
import { FaHome, FaCog } from 'react-icons/fa'; // Added FaCog for settings icon
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineCalendar } from 'react-icons/hi';
import { PiStudent } from 'react-icons/pi';
import { MdOutlinePausePresentation } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { NavLink, useLocation } from 'react-router-dom';
import { LuClipboardList } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVideoChat } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import {FaChartLine, FaUsers, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa';
import { MdOutlinePayments, MdOutlineSupportAgent } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import {IoSettingsOutline } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";
const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (!openMenu) {
      if (location.pathname.startsWith('/dashboard')) {
        setOpenMenu('teachers');
      } else if (location.pathname.startsWith('/students')) {
        setOpenMenu('students');
      } else if (location.pathname.startsWith('/exam')) {
        setOpenMenu('exam');
      } else if (location.pathname.startsWith('/routine')) {
        setOpenMenu('routine');
      } else if (location.pathname.startsWith('/lesson')) {
        setOpenMenu('lessons');
      } else if (location.pathname.startsWith('/class-section')) {
        setOpenMenu('class');
      }
    }
  }, []); // Empty dependency = run only once

  const handleToggle = (menu) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
<aside
      className={`transition-all duration-300 fixed w-[70%] md:w-[30%] lg:w-[20%] xl:w-[17%] h-full z-[999] border-r border-indigo-900 text-sm shadow-lg pt-[12vh] p-4 ${
        isOpen ? 'left-0 top-0' : 'left-[-120%] top-0'
      } bg-gradient-to-b from-indigo-950 to-indigo-900 text-white`}
    >
      {/* Dashboard */}
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

      {/* Affiliate Specific Menus */}
      {[
        {
          label: 'Statistics',
          icon: <FaChartLine className="text-[18px]" />,
          key: 'stats',
          links: [
            { to: '/affiliate/statistics/overview', text: 'Overview' },
            { to: '/affiliate/statistics/traffic', text: 'Traffic Sources' },
            { to: '/affiliate/statistics/conversions', text: 'Conversions' },
          ],
        },
        {
          label: 'Players',
          icon: <FaUsers className="text-[18px]" />,
          key: 'players',
          links: [
            { to: '/affiliate/players/all', text: 'All Players' },
            { to: '/affiliate/players/active', text: 'Active Players' },
            { to: '/affiliate/players/inactive', text: 'Inactive Players' },
          ],
        },
        {
          label: 'Commissions',
          icon: <FaMoneyBillWave className="text-[18px]" />,
          key: 'commissions',
          links: [
            { to: '/affiliate/commissions/earnings', text: 'Earnings' },
            { to: '/affiliate/commissions/history', text: 'History' },
            { to: '/affiliate/commissions/rates', text: 'Commission Rates' },
          ],
        },
        {
          label: 'Payments',
          icon: <MdOutlinePayments className="text-[18px]" />,
          key: 'payments',
          links: [
            { to: '/affiliate/payments/withdraw', text: 'Request Payment' },
            { to: '/affiliate/payments/history', text: 'Payment History' },
            { to: '/affiliate/payments/methods', text: 'Payment Methods' },
          ],
        },
        {
          label: 'Promotions',
          icon: <RiCouponLine className="text-[18px]" />,
          key: 'promotions',
          links: [
            { to: '/affiliate/promotions/banners', text: 'Promo Banners' },
            { to: '/affiliate/promotions/links', text: 'Tracking Links' },
            { to: '/affiliate/promotions/materials', text: 'Marketing Materials' },
          ],
        },
        {
          label: 'Transfers',
          icon: <BiTransferAlt className="text-[18px]" />,
          key: 'transfers',
          links: [
            { to: '/affiliate/transfers/player-to-player', text: 'Player Transfers' },
            { to: '/affiliate/transfers/history', text: 'Transfer History' },
          ],
        },
        {
          label: 'Reports',
          icon: <FaFileAlt className="text-[18px]" />,
          key: 'reports',
          links: [
            { to: '/affiliate/reports/daily', text: 'Daily Report' },
            { to: '/affiliate/reports/monthly', text: 'Monthly Report' },
            { to: '/affiliate/reports/custom', text: 'Custom Report' },
          ],
        },
        {
          label: 'Support',
          icon: <MdOutlineSupportAgent className="text-[18px]" />,
          key: 'support',
          links: [
            { to: '/affiliate/support/tickets', text: 'My Tickets' },
            { to: '/affiliate/support/faq', text: 'FAQ' },
            { to: '/affiliate/support/contact', text: 'Contact Us' },
          ],
        }
      ].map(({ label, icon, key, links }) => (
        <div key={key} className="mb-3">
          <div
            onClick={() => handleToggle(key)}
            className={`flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
              openMenu === key
                ? 'bg-indigo-700 text-white font-semibold shadow'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              {icon}
              {label}
            </span>
            <FiChevronRight
              className={`transition-transform duration-300 ${
                openMenu === key ? 'rotate-90' : ''
              }`}
            />
          </div>
          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ${
              openMenu === key ? 'max-h-60' : 'max-h-0'
            }`}
          >
            {links.map(({ to, text }) => (
              <NavLink
                key={text}
                to={to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                    isActive 
                      ? 'text-white font-medium bg-indigo-600' 
                      : 'text-indigo-100 hover:text-white'
                  }`
                }
              >
                {text}
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      {/* Settings Menu */}
      <div className="mb-3 mt-8 border-t border-indigo-800 pt-4">
        <div
          onClick={() => handleToggle('settings')}
          className={`flex items-center justify-between w-full px-3 py-2 text-[15px] lg:text-[16px] cursor-pointer rounded-[5px] transition duration-200 ${
            openMenu === 'settings'
              ? 'bg-indigo-700 text-white font-semibold shadow'
              : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <IoSettingsOutline className="text-[18px]" />
            Settings
          </span>
          <FiChevronRight
            className={`transition-transform duration-300 ${
              openMenu === 'settings' ? 'rotate-90' : ''
            }`}
          />
        </div>
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ${
            openMenu === 'settings' ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <NavLink
            to="/affiliate/settings/profile"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Profile Settings
          </NavLink>
          <NavLink
            to="/affiliate/settings/notifications"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Notifications
          </NavLink>
          <NavLink
            to="/affiliate/settings/security"
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md mt-1 ${
                isActive 
                  ? 'text-white font-medium bg-indigo-600' 
                  : 'text-indigo-100 hover:text-white'
              }`
            }
          >
            Security
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;