import React, { useState } from 'react';
import { 
  FaDollarSign, 
  FaUsers, 
  FaChartLine, 
  FaPercentage, 
  FaExchangeAlt,
  FaRegClock,
  FaRegUserCircle
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

const Dashbaord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Affiliate stats cards
  const cards = [
    {
      value: '$8,450',
      label: 'Total Earnings',
      icon: <FaDollarSign className="text-2xl text-purple-500" />,
      footer: '15% increase this week',
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      value: '328',
      label: 'Referred Users',
      icon: <FaUsers className="text-2xl text-blue-500" />,
      footer: '42 new signups',
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      value: '4.8%',
      label: 'Conversion Rate',
      icon: <FaPercentage className="text-2xl text-green-500" />,
      footer: 'Industry average: 3.2%',
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      value: '$125.60',
      label: 'Avg. Payout',
      icon: <FaExchangeAlt className="text-2xl text-orange-500" />,
      footer: 'Per active user',
      color: 'bg-orange-500',
      trend: 'steady'
    },
  ];

  // Daily commission data for line chart
  const commissionData = [
    { day: 'Mon', commission: 450, clicks: 120 },
    { day: 'Tue', commission: 800, clicks: 210 },
    { day: 'Wed', commission: 600, clicks: 180 },
    { day: 'Thu', commission: 950, clicks: 250 },
    { day: 'Fri', commission: 1100, clicks: 320 },
    { day: 'Sat', commission: 1500, clicks: 410 },
    { day: 'Sun', commission: 1250, clicks: 380 },
  ];

  // Traffic sources for pie chart
  const trafficData = [
    { name: 'Social Media', value: 35, color: '#8B5CF6' },
    { name: 'Direct Links', value: 25, color: '#3B82F6' },
    { name: 'Email Campaign', value: 20, color: '#EC4899' },
    { name: 'SEO/Organic', value: 20, color: '#F59E0B' },
  ];

  // Recent referrals table data
  const referrals = [
    { id: 1, name: 'John D.', date: '2023-06-15', status: 'Active', wagered: '$1,250', commission: '$62.50' },
    { id: 2, name: 'Sarah M.', date: '2023-06-14', status: 'Active', wagered: '$890', commission: '$44.50' },
    { id: 3, name: 'Mike T.', date: '2023-06-14', status: 'Pending', wagered: '$0', commission: '$0' },
    { id: 4, name: 'Emma L.', date: '2023-06-13', status: 'Active', wagered: '$2,150', commission: '$107.50' },
    { id: 5, name: 'David K.', date: '2023-06-12', status: 'Inactive', wagered: '$420', commission: '$21.00' },
  ];

  // Quick actions
  const quickActions = [
    { icon: <FaRegUserCircle className="text-xl" />, label: 'Add Sub-Affiliate', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <FaRegClock className="text-xl" />, label: 'Pending Commissions', color: 'bg-yellow-100 text-yellow-600' },
    { icon: <FaChartLine className="text-xl" />, label: 'Performance Report', color: 'bg-green-100 text-green-600' },
    { icon: <FaUsers className="text-xl" />, label: 'Referral Links', color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <section className="font-inter h-screen bg-gray-50 ">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex pt-[10vh] h-[90vh]">
        <Sidebar isOpen={isSidebarOpen} />

        <main
          className={`transition-all duration-300 flex-1 p-6 overflow-y-auto h-[90vh] ${
            isSidebarOpen ? 'ml-[17%]' : 'ml-0'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Affiliate Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your performance overview</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
              Withdraw Earnings
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-5 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h2>
                  </div>
                  <div className={`p-3 rounded-lg ${card.color.replace('bg', 'bg-opacity-10')} ${card.color}`}>
                    {card.icon}
                  </div>
                </div>
                <div className={`px-5 py-3 text-sm flex justify-between items-center border-t border-gray-100`}>
                  <span className={`${card.trend === 'up' ? 'text-green-600' : card.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {card.footer}
                  </span>
                  {card.trend === 'up' && <span className="text-green-600">↑</span>}
                  {card.trend === 'down' && <span className="text-red-600">↓</span>}
                  {card.trend === 'steady' && <span className="text-gray-600">→</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Commission Trend Chart */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Weekly Commission Trend</h2>
                <select className="text-sm border border-gray-200 rounded px-2 py-1 bg-white">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={commissionData}>
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="commission" name="Commission ($)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="clicks" name="Referral Clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Traffic Sources Chart */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Traffic Sources</h2>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={trafficData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label
                      >
                        {trafficData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Traffic']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                  {trafficData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className="text-sm font-medium">{entry.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Referrals & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Referrals */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Recent Referrals</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wagered</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referrals.map((referral) => (
                      <tr key={referral.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{referral.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referral.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${referral.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {referral.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referral.wagered}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{referral.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 text-right">
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  View All Referrals →
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index} 
                    className={`flex flex-col items-center justify-center p-4 rounded-lg ${action.color} hover:shadow-md transition-all`}
                  >
                    {action.icon}
                    <span className="mt-2 text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Affiliate Link */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Your Affiliate Link</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    value="https://betting-site.com/ref/aff1234" 
                    readOnly 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-r-lg text-sm">
                    Copy
                  </button>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Performance Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commission Rate</span>
                    <span className="font-semibold">5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Referrals</span>
                    <span className="font-semibold">142</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Wagered</span>
                    <span className="font-semibold">$84,250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Payout Date</span>
                    <span className="font-semibold">June 30, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Dashbaord;