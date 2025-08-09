import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Header from "../common/Header";
import { nanoid } from "nanoid";
import toast,{Toaster} from "react-hot-toast"
const Pendingwithdraw = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 const [orderId, setOrderId] = useState("");
 const base_url = import.meta.env.VITE_API_KEY_Base_URL;
 const base_url2 = import.meta.env.VITE_API_KEY_Base_URL2;
  // Fetch Pending Withdrawals
  const fetchWithdrawals = () => {
    axios
      .get(`${base_url}/admin/pending-withdrawal`)
      .then((res) => {
        setPendingWithdrawals(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWithdrawals();
    setOrderId(nanoid(8));

  }, []);

  // Handle Status Change
const handlewithdraw = (e) => {
  e.preventDefault();
  
  const amount = parseFloat(transactionAmount);

  if (isNaN(amount) || amount < 300) {
    toast.error("Withdrawal must be greater than 300 Taka.");
    setwithdraw_message("Withdrawal must be greater than 300 Taka.");
    return;
  }
  
  if (user_details?.balance < 300) {
    toast.error("You have not enough balance!");
    setwithdraw_message("You have not enough balance!");
    return;
  }
  
  if (amount > 10000) {
    toast.error("Withdrawal must be less than 10,000 Taka.");
    setwithdraw_message("Withdrawal must be less than 10,000 Taka.");
    return;
  }

  // Check if user is eligible based on deposit_money and bet_number
  if (user_details.deposit_money > user_details.bet_deposit) {
    toast.error("You are not eligible for withdrawal.");
    setwithdraw_message("You are not eligible for withdrawal.");
    return;
  }

  // Check if bet_deposit is 3 times deposit_money
  const totalDeposit = user_details.deposit_money * 3;
  let finalAmount = amount;
  let taxAmount = 0;

  if (user_details.bet_deposit < totalDeposit) {
    taxAmount = amount * 0.2;
    finalAmount = amount - taxAmount; // Deduct 20%

    // Show SweetAlert2 confirmation popup
    Swal.fire({
      title: "Withdrawal Fee Notice",
      text: `20% (${taxAmount} Taka) will be deducted due to withdrawal policy. You will receive ${finalAmount} Taka instead.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        processWithdraw(finalAmount, taxAmount);
      }
    });

    return; // Stop execution until user confirms
  }

  // If no fee, proceed immediately with full amount
  processWithdraw(finalAmount, taxAmount);
};

// Function to process withdrawal request
const processWithdraw = (finalAmount, taxAmount) => {
  setLoading(true);
  
  // First create the withdrawal record
  axios.post(`${base_url}/user/payout`, {
    username: user_info?.name,
    email: user_info.email,
    amount: finalAmount + taxAmount, // Original requested amount
    playerId: user_info.player_id,
    userId: user_info._id,
    tax_amount: taxAmount, // 20% tax if applicable, otherwise 0
    recieved_amount: finalAmount, // Amount after deduction
    provider: selectedMethod.name.toLowerCase(),
    orderId: `order_${Date.now()}`,
    post_balance: user_details.balance,
    payeeAccount: payeer_account,
  }, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
  .then((res) => {
    if (res.data.success) {
      // If withdrawal record created successfully, initiate payout
      const withdrawalId = res.data.withdrawal._id;
      
      axios.post(`${base_url2}/api/payment/payout`, {
        mid: "hobet", // Your merchant ID
        provider: selectedMethod.name.toLowerCase(),
        amount: finalAmount + taxAmount,
        orderId: `order_${Date.now()}`,
        payeeId: user_info.player_id,
        payeeAccount: payeer_account,
        callbackUrl: `${base_url}/admin/withdrawals-take`,
        currency: "BDT",
      }, {
        headers: {
          'x-api-key': '8e91f27afc311cce77c1' // Your API key
        }
      })
      .then((payoutRes) => {
        if (payoutRes.data.success) {
          // Update the withdrawal status to approved
          axios.put(`${base_url}/admin/withdrawals/${withdrawalId}/status`, { 
            status: "approved",
            transactionId: payoutRes.data.transactionId 
          }, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
          .then(() => {
            toast.success("Withdrawal processed successfully!");
            user_data(); // Refresh user data
            setTransactionAmount("");
            setpayeer_account("");
            setSelectedMethod(null);
            setPopupOpen(false);
            setPaymentSuccess(true);
            setSuccessPopupVisible(true);
            
            setTimeout(() => {
              setPaymentSuccess(false);
              setSuccessPopupVisible(false);
            }, 5000);
          })
          .catch((err) => {
            console.error("Error updating withdrawal status:", err);
            toast.error("Withdrawal processed but status update failed");
          });
        } else {
          toast.error(payoutRes.data.message || "Payout processing failed");
        }
      })
      .catch((err) => {
        console.error("Payout error:", err);
        toast.error("Payout processing failed");
      });
    } else {
      setwithdraw_message(res.data.message);
      toast.error(res.data.message || "Withdrawal creation failed");
    }
  })
  .catch((err) => {
    console.error("Withdrawal error:", err);
    toast.error("Withdrawal processing failed");
  })
  .finally(() => {
    setLoading(false);
  });
};
  
  
  // Filter Withdrawals Based on Search Query
  const filteredWithdrawals = pendingWithdrawals.filter((transaction) =>
    transaction.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status Colors
  const statusColors = {
    pending: "bg-orange-100 text-orange-600",
    "in review": "bg-yellow-100 text-yellow-600",
    approved: "bg-indigo-100 text-indigo-600",
    assigned: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <div className="w-full font-bai overflow-y-auto">
      <Header />
      <Toaster/>
      <section className="p-4">
        <div className="p-6">
          <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pending Withdrawals</h1>

              {/* Search Input */}
              <div className="relative w-[30%]">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="custom-scrollbar overflow-x-auto">
              <table className="custom-scrollbar overflow-x-auto w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#4634FF] text-white">
                    <th className="p-3 text-left text-nowrap">Gateway</th>
                    <th className="p-3 text-left text-nowrap">Method</th>
                    <th className="p-3 text-left text-nowrap">Initiated</th>
                    <th className="p-3 text-left text-nowrap">User</th>
                    <th className="p-3 text-left text-nowrap">Post Balance</th>
                    <th className="p-3 text-left text-nowrap">Expected Amount</th>
                    <th className="p-3 text-left text-nowrap">Recieved Amount</th>
                    <th className="p-3 text-left text-nowrap">Tax Amount</th>
                    <th className="p-3 text-left text-nowrap">Current Status</th>
                    <th className="p-3 text-left text-nowrap">Change Status</th>
                    <th className="p-3 text-left text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWithdrawals.map((transaction, index) => (
                    <tr key={index} className="border-b even:bg-gray-50 text-nowrap">
                      <td className="font-semibold  text-purple-500 ">
                        Eassypay
                      </td>
                      <td className="p-3">
                        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                          {transaction?.provider}
                        </span>
                        <div className="text-gray-500 text-sm">{transaction.transactionId}</div>
                      </td>
                      <td className="p-3 text-gray-700">
                        {moment(transaction?.createdAt).format("MMMM Do YYYY, h:mm A")}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-gray-700">{transaction?.email}</span>
                        <div className="text-blue-600 cursor-pointer hover:underline">
                          {transaction?.username}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-700 font-semibold">৳{transaction.post_balance}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-700 font-semibold">৳{transaction.amount}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-green-500 font-semibold">৳{transaction.recieved_amount}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-red-500 font-semibold">৳{transaction.tax_amount}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-md text-[15px] font-[500] ${statusColors[transaction.status]}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          className={`px-2 py-1 rounded-md text-sm border ${statusColors[transaction.status]}`}
                          value={transaction.status}
                          onChange={(e) => handleStatusChange(transaction._id, e.target.value,transaction)}
                          disabled={transaction.status === "approved"}
                        >
                          <option value="pending">Pending</option>
                          <option value="in review">In Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <NavLink to={`/withdraw/pending-withdraw-details/${transaction._id}`}>
                          <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition">
                            <FaRegCommentDots /> Details
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pendingwithdraw;
