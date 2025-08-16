const express=require("express");
const UserModel = require("../Models/User");
const transaction_model = require("../Models/Transactionmodel");
const Withdrawmodel = require("../Models/Withdrawmodel");
const ensureAuthenticated = require("../Middlewares/Auth");
const user_route=express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../Models/User");
const axios= require("axios");
// ----------------- Update Username -----------------
user_route.put("/update-username", ensureAuthenticated, async (req, res) => {
    try {
        const { userId, newUsername, password } = req.body;

        // ইনপুট ভ্যালিডেশন
        if (!newUsername || !password) {
            return res.status(400).json({
                success: false,
                message: "নতুন ইউজারনেম এবং পাসওয়ার্ড অবশ্যই প্রয়োজন"
            });
        }

        // ইউজারনেম ফরম্যাট ভ্যালিডেশন
        if (!/^[a-zA-Z0-9_]{4,20}$/.test(newUsername)) {
            return res.status(400).json({
                success: false,
                message: "ইউজারনেম অবশ্যই ৪-২০ ক্যারেক্টারের হতে হবে এবং শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা এবং আন্ডারস্কোর ব্যবহার করা যাবে"
            });
        }

        // পাসওয়ার্ড সহ ইউজার খুঁজুন
        const user = await UserModel.findById(userId).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "ইউজার খুঁজে পাওয়া যায়নি"
            });
        }

        // পাসওয়ার্ড ভেরিফাই করুন
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "পাসওয়ার্ড ভুল হয়েছে"
            });
        }

        // নতুন ইউজারনেম ইতিমধ্যে আছে কিনা চেক করুন
        const existingUser = await UserModel.findOne({ username: newUsername });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({
                success: false,
                message: "এই ইউজারনেম ইতিমধ্যে নেওয়া হয়েছে"
            });
        }

        // ইউজারনেম আপডেট করুন
        const oldUsername = user.username;
        user.username = newUsername;
        await user.save();

        res.status(200).json({
            success: true,
            message: "ইউজারনেম সফলভাবে আপডেট হয়েছে",
            data: {
                oldUsername,
                newUsername
            }
        });

    } catch (error) {
        console.error("ইউজারনেম আপডেট করতে সমস্যা:", error);
        res.status(500).json({
            success: false,
            message: "ইউজারনেম আপডেট করতে ব্যর্থ হয়েছে",
            error: error.message
        });
    }
});
// -------------------------refer-balance-transfrer-to-main-balance-------------------
user_route.put("/transfer-refer-balance-to-main-balance",async(req,res)=>{
    try {
        const { userId } = req.body;

        // ইউজার খুঁজুন
        const user = await UserModel.findById({_id:userId});  
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "ইউজার খুঁজে পাওয়া যায়নি"
            });
        }
        // রেফারেল ব্যালেন্স চেক করুন
        console.log(user)
        if (user.referralEarnings <= 999) {
            return res.status(400).json({
                success: false,
                message: "রেফারেল ব্যালেন্স শূন্য বা নেতিবাচক"
            });
        }
        // রেফারেল ব্যালেন্স থেকে মেইন ব্যালেন্সে ট্রান্সফার করুন
        user.balance += user.referralEarnings;
        user.referralEarnings = 0; // রেফারেল ব্যালেন্স শূন্য করুন
        await user.save();
        res.send({
            success: true,
            message: "রেফারেল ব্যালেন্স সফলভাবে মেইন ব্যালেন্সে ট্রান্সফার হয়েছে",
            data: {
                balance: user.balance,
                referralEarnings: user.referralEarnings
            }
        });
    } catch (error) {
     console.log(error)
    }});
// --------------------------------user-information-----------------------
user_route.get("/user-information/:id",ensureAuthenticated,async(req,res)=>{
  try {
    const userinfo=await User.findById({_id:req.params.id})
    if(!userinfo){
       return res.send({success:false,message:"User did not find!"})
    }
    res.send({success:true,data:userinfo})
  } catch (error) {
    console.log(error)
  }
})
// -------------------------after-play-------------------------------
user_route.put("/after-play-minus-balance",ensureAuthenticated,async(req,res)=>{
    try {
        const {betAmount,player_id}=req.body;
        console.log(req.body)
        const find_user=await UserModel.findOne({player_id:player_id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
        find_user.balance-=betAmount;
        res.send({success:true,message:"Ok"})
        find_user.save();
    } catch (err) {
        console.log(err)
    }
});
// ---------------------deposit-system--------------------------------

// Payment gateway configuration
const PAYMENT_CONFIG = {
  BASE_URL: process.env.PAYMENT_GATEWAY_URL || 'http://localhost:8080',
  API_KEY: process.env.PAYMENT_GATEWAY_API_KEY || 'b681e4a242dfdcf173db',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5175'
};

// Deposit initiation
// Deposit initiation with proper bonus handling
user_route.post('/initiate', async (req, res) => {
    const { method, amount, bonusType, userid } = req.body;
    
    try {
        // Validate inputs
        if (!method || !amount || !userid) {
            return res.status(400).json({ 
                success: false,
                message: 'Method, amount and user ID are required' 
            });
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum)) {
            return res.status(400).json({ 
                success: false,
                message: 'অনুগ্রহ করে একটি বৈধ অর্থের পরিমাণ লিখুন' // Please enter a valid amount
            });
        }

        if (amountNum < 100 || amountNum > 30000) {
            return res.status(400).json({ 
                success: false,
                message: amountNum < 100 ? 
                    'ন্যূনতম জমার পরিমাণ ১০০ টাকা' : // Minimum deposit amount is 100 BDT
                    'সর্বোচ্চ জমার পরিমাণ ৩০,০০০ টাকা' // Maximum deposit amount is 30,000 BDT
            });
        }
       
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        // Check if user has mobile number
        if (!user.phone) {
            return res.status(400).json({ 
                success: false,
                message: 'অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে একটি মোবাইল নম্বর যোগ করুন' // Please add mobile number first
            });
        }

        // Calculate account age in days
        const accountAgeInDays = Math.floor((new Date() - user.createdAt) / (1000 * 60 * 60 * 24));
        const isNewUser = accountAgeInDays < 3;
        
        // Check bonus eligibility
        const firstDepositBonusAvailable = !user.bonusInfo.firstDepositBonusClaimed && user.total_deposit === 0;
        const specialBonusAvailable = isNewUser && user.total_deposit === 0 && 
                                   !user.bonusInfo.activeBonuses.some(b => b.bonusType === 'special_bonus');

        // Validate bonus selection
        if (bonusType && bonusType !== 'none') {
            if (bonusType === 'first_deposit' && !firstDepositBonusAvailable) {
                return res.status(400).json({ 
                    success: false,
                    message: 'প্রথম ডিপোজিট বোনাস পাওয়ার জন্য আপনি অযোগ্য' // Not eligible for first deposit bonus
                });
            }
            
            if (bonusType === 'special_bonus' && !specialBonusAvailable) {
                return res.status(400).json({ 
                    success: false,
                    message: 'বিশেষ বোনাস পাওয়ার জন্য আপনি অযোগ্য' // Not eligible for special bonus
                });
            }
        } else if ((firstDepositBonusAvailable || specialBonusAvailable) && (!bonusType || bonusType === 'none')) {
            return res.status(400).json({ 
                success: false,
                message: 'অনুগ্রহ করে একটি বোনাস অফার নির্বাচন করুন' // Please select a bonus offer
            });
        }

        // Create deposit record
        const deposit = {
            method,
            amount: amountNum,
            status: 'pending',
            bonusType: bonusType || 'none',
            orderId: `DEP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            createdAt: new Date()
        };

        user.depositHistory.push(deposit);
        await user.save();

        // Prepare payment gateway payload
        const paymentPayload = {
            provider: method.toLowerCase(),
            amount: amountNum,
            orderId: deposit.orderId,
            currency: "BDT",
            payerId: user.player_id,
            redirectUrl: `http://localhost:5173`, // Adjust as needed
            callbackUrl: `http://localhost:8000/user/callback`
        };

        // Call payment gateway API
        const paymentResponse = await axios.post(
            `${PAYMENT_CONFIG.BASE_URL}/api/payment/payment`,
            paymentPayload,
            {
                headers: {
                    'x-api-key': PAYMENT_CONFIG.API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!paymentResponse.data || !paymentResponse.data.success) {
            throw new Error(paymentResponse.data?.message || 'Failed to initiate payment');
        }

        res.json({
            success: true,
            message: 'Payment initiated successfully',
            paymentId: paymentResponse.data.paymentId,
            redirectUrl: paymentResponse.data.redirectUrl || 
                      `${PAYMENT_CONFIG.FRONTEND_URL}/checkout/${paymentResponse.data.paymentId}`
        });

    } catch (error) {
        console.error('Deposit initiation error:', error);
        res.status(500).json({ 
            success: false,
            message: error.response?.data?.message || error.message || 'Payment failed. Please try again.' 
        });
    }
});

// Payment callback handler with bonus processing
user_route.post('/callback', async (req, res) => {
    const { paymentId, transactionId, status, amount, player_id } = req.body;
    
    try {
        if (!paymentId || !status || !player_id) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid callback data' 
            });
        }

        // Find user with pending deposit
        const user = await User.findOne({
            'depositHistory.orderId': paymentId,
            'depositHistory.status': 'pending',
            'player_id': player_id
        }).populate('referredBy');
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Deposit not found or already processed' 
            });
        }

        // Find the specific deposit record
        const depositIndex = user.depositHistory.findIndex(d => d.orderId === paymentId);
        if (depositIndex === -1) {
            return res.status(404).json({ 
                success: false,
                message: 'Deposit record not found' 
            });
        }

        const deposit = user.depositHistory[depositIndex];

        if (status === 'success') {
            // Verify amount matches
            if (amount && parseFloat(amount) !== deposit.amount) {
                console.warn(`Amount mismatch for payment ${paymentId}. Expected: ${deposit.amount}, Received: ${amount}`);
            }
            
            // Calculate bonus if applicable
            let bonusAmount = 0;
            if (deposit.bonusType === 'first-deposit') {
                bonusAmount = deposit.amount * 0.03; // 3% bonus
                // Mark first deposit bonus as claimed
                user.bonusInfo.firstDepositBonusClaimed = true;
                user.balance += bonusAmount;
                user.bouceBalance += bonusAmount; // Add bonus to bonus balance
            } else if (deposit.bonusType === 'special-bonus') {
                bonusAmount = deposit.amount * 1.5; // 150% bonus
                // Add special bonus to active bonuses
                user.bonusInfo.activeBonuses.push({
                    bonusType: 'special_bonus',
                    amount: bonusAmount,
                    originalAmount: bonusAmount,
                    wageringRequirement: 30, // 30x
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days expiry
                });
                  // Add bonus to bonus balance if applicable
            if (bonusAmount > 0) {
                user.bonusBalance += bonusAmount;
            }
            }

            // Update deposit status
            user.depositHistory[depositIndex] = {
                ...deposit.toObject(),
                status: 'completed',
                transactionId: transactionId,
                completedAt: new Date(),
                bonusAmount: bonusAmount,
                bonusApplied: bonusAmount > 0
            };

            // Update user balance
            const balanceBefore = user.balance;
            user.balance += deposit.amount;
            user.total_deposit += deposit.amount;

          

            // Add transaction record
            user.transactionHistory.push({
                type: 'deposit',
                amount: deposit.amount,
                balanceBefore: balanceBefore,
                balanceAfter: user.balance,
                description: `Deposit via ${deposit.method}`,
                referenceId: transactionId,
                createdAt: new Date()
            });

            // Handle referral bonus if user was referred by someone
        if (user.referredBy) {
    const referrer = await User.findById(user.referredBy);
    if (referrer) {
        // Calculate referral bonus based on the formula:
        // (Total Deposit - Total Withdrawal - Current Balance) × 25%
        const netLoss = user.total_deposit - user.total_withdraw - user.balance;
        const referralBonus = netLoss * 0.25;
        console.log("Referral bonus calculated:", referralBonus);
        
        // Proceed if referralBonus is not zero (either positive or negative)
        if (referralBonus !== 0) {
            // Update referrer's balance
            const referrerBalanceBefore = referrer.balance;
            
            if (referralBonus > 0) {
                // Positive bonus - add to referrer's balance
                referrer.balance += referralBonus;
                referrer.referralEarnings += referralBonus;
            } else {
                // Negative bonus - deduct from referrer's balance
                // Ensure referrer has enough balance to cover the deduction
                if (referrer.balance >= Math.abs(referralBonus)) {
                    referrer.balance += referralBonus; // Adding negative number = deduction
                    referrer.referralEarnings += referralBonus; // Deduct from earnings
                } else {
                    // If not enough balance, set to zero and track the remaining debt
                    const remainingDebt = Math.abs(referralBonus) - referrer.balance;
                    referrer.referralEarnings -= referrer.balance; // Deduct what we can
                    referrer.balance = 0;
                    console.log(`Referrer doesn't have enough balance to cover full deduction. Remaining debt: ${remainingDebt}`);
                    // You might want to track this debt somewhere
                }
            }
            
            // Update referral tracking
            const referralUserIndex = referrer.referralUsers.findIndex(
                ref => ref.user && ref.user.toString() === user._id.toString()
            );
            
            if (referralUserIndex !== -1) {
                referrer.referralUsers[referralUserIndex].earnedAmount += referralBonus;
            } else {
                referrer.referralUsers.push({
                    user: user._id,
                    joinedAt: new Date(),
                    earnedAmount: referralBonus
                });
            }
            
            // Add transaction record for referrer
            referrer.transactionHistory.push({
                type: referralBonus > 0 ? 'bonus' : 'penalty',
                amount: Math.abs(referralBonus),
                balanceBefore: referrerBalanceBefore,
                balanceAfter: referrer.balance,
                description: referralBonus > 0 
                    ? `Referral bonus from ${user.username}'s deposit (25% of net loss)`
                    : `Referral penalty from ${user.username}'s activity (25% of net gain)`,
                referenceId: `REF-${transactionId}`,
                createdAt: new Date()
            });
            
            // Add transaction record for referred user
            user.transactionHistory.push({
                type: 'bonus',
                amount: 0,
                balanceBefore: user.balance,
                balanceAfter: user.balance,
                description: referralBonus > 0
                    ? `Your activity generated referral bonus for ${referrer.username}`
                    : `Your activity resulted in referral penalty for ${referrer.username}`,
                referenceId: `REF-${transactionId}`,
                createdAt: new Date()
            });
            
            await referrer.save();
        }
    }
}

            await user.save();
            
            return res.json({ 
                success: true,
                message: 'Deposit completed successfully',
                bonusAmount: bonusAmount
            });
        } else {
            // Mark as failed
            user.depositHistory[depositIndex] = {
                ...deposit.toObject(),
                status: 'failed',
                processedAt: new Date()
            };
            
            await user.save();
            
            return res.json({ 
                success: false,
                message: 'Deposit failed' 
            });
        }
    } catch (error) {
        console.error('Deposit callback error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error processing callback' 
        });
    }
});
// Bonus cancellation route with penalty
user_route.post('/cancel-bonus', async (req, res) => {
    const { userid } = req.body;
    try {
        console.log(userid)
        if (!userid) {
            return res.status(400).json({ 
                success: false,
                message: 'User ID is required' 
            });
        }
 
        const user = await User.findById(userid);
        console.log(user)
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        // Check if user has any active bonus
        if (user.bonusBalance <= 0 || !user.bonusInfo.activeBonuses.some(b => b.status === 'active')) {
            return res.status(400).json({ 
                success: false,
                message: 'কোন সক্রিয় বোনাস নেই' // No active bonus
            });
        }

        // Record cancelled bonus
        const cancelledBonusAmount = user.bonusBalance;
        user.bonusInfo.cancelledBonuses.push({
            bonusType: 'special_bonus', // Assuming it's special bonus
            amount: cancelledBonusAmount,
            penaltyApplied: 0, // No penalty
            cancelledAt: new Date()
        });

        // Clear bonus balance
        user.bonusBalance = 0;
        
        // Mark all active bonuses as cancelled
        user.bonusInfo.activeBonuses = user.bonusInfo.activeBonuses.map(bonus => {
            if (bonus.status === 'active') {
                return {
                    ...bonus.toObject(),
                    status: 'cancelled'
                };
            }
            return bonus;
        });

        await user.save();

        res.json({
            success: true,
            message: 'বোনাস সফলভাবে বাতিল হয়েছে।', 
            // Bonus cancelled successfully.
            cancelledBonusAmount: cancelledBonusAmount,
            newBalance: user.balance
        });

    } catch (error) {
        console.error('Bonus cancellation error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message || 'বোনাস বাতিল করতে ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।' 
            // Failed to cancel bonus. Please try again later.
        });
    }
});
// Helper function to send deposit notification
async function sendDepositNotification(user, amount, bonusAmount = 0) {
    try {
        const notification = {
            userId: user._id,
            type: 'deposit',
            title: 'Deposit Completed',
            message: `Your deposit of ${amount} BDT has been processed${bonusAmount > 0 ? ` with ${bonusAmount} BDT bonus` : ''}`,
            read: false,
            createdAt: new Date()
        };
        
        // Here you would typically save to database and/or send push notification
        // For example:
        // await Notification.create(notification);
        // sendPushNotification(user.deviceTokens, notification);
        
        console.log(`Notification sent for deposit: ${amount} BDT`);
    } catch (error) {
        console.error('Error sending deposit notification:', error);
    }
}
// Get deposit history
user_route.get('/history', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Sort by most recent first
        const history = user.depositHistory.sort((a, b) => b.createdAt - a.createdAt);
        
        res.json({
            success: true,
            history: history
        });
    } catch (error) {
        console.error('Error getting deposit history:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// ------------------after-win--------------------------
user_route.put("/after-wind-add-balance",ensureAuthenticated,async(req,res)=>{
    try {
        const {winAmount,player_id}=req.body;
        console.log(req.body)
        const find_user=await UserModel.findOne({player_id:player_id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
        find_user.balance+=winAmount;
        res.send({success:true,message:"Ok"})
        find_user.save();
    } catch (err) {
        console.log(err)
    }
});
// -------------------------after-withdraw-------------------------------
user_route.put("/after-withdraw-minus-balance",ensureAuthenticated,async(req,res)=>{
    try {
        const {amount,player_id}=req.body;
        console.log(req.body)
        const find_user=await UserModel.findOne({player_id:player_id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
        find_user.balance-=amount;
        res.send({success:true,message:"Ok"})
        find_user.save();
    } catch (err) {
        console.log(err)
    }
});
// -------------create-transations--------------------
user_route.post("/create-transaction", async (req, res) => {
  try {
      const {
          transiction,
          customer_id,
          payment_type,
          payment_method,
          amount,
          post_balance,
          transaction,
          type,
          status,
          updated_by,
          reason,
      } = req.body;
      console.log(req.body)
      // Check if transaction already exists based on a unique identifier (transaction ID)
      const existingTransaction = await transaction_model.findOne({ transaction });
      const find_user = await UserModel.findOne({ _id: customer_id });

      if (existingTransaction) {
          return res.json({ message: "Transaction already exists." });
      }

      // Create a new transaction
      const newTransaction = new transaction_model({
          transiction,
          customer_id,
          customer_name: find_user.name,
          customer_email: find_user.email,
          payment_type,
          payment_method,
          amount,
          post_balance,
          transaction,
          type: type || "deposit", // default type is 'deposit'
          status,
          updated_by: updated_by || "", // default empty string for updated_by
          reason,
      });

      // Save the new transaction to the database
      await newTransaction.save();

      // If status is "success", update the user's balance
      if (status === "success") {
              find_user.balance += amount;
              await UserModel.findByIdAndUpdate({_id:find_user._id},{$set:{deposit_money:amount}})
              // Save the updated user balance
               await find_user.save();
      }

      return res.status(201).json({
          message: "Transaction created successfully, and user balance updated.",
          transaction: newTransaction,
          updatedBalance: find_user.balance,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error, please try again later." });
  }
});

user_route.get("/callback-payment",(req,res)=>{
  try {
    console.log(req.body)
  } catch (error) {
    console.log(error)
  }
})
// --------------single-user-transaction-data---------------------
user_route.get("/single-user-transactions/:id",async(req,res)=>{
    try {
        const transaction_data=await transaction_model.find({customer_id:req.params.id}).sort({ createdAt: -1 });
        if(!transaction_data){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:transaction_data})
    } catch (error) {
        console.log(error)
    }
});
// ----------------withdrawal-history------------------------
// Create a withdrawal request
user_route.post("/payout", async (req, res) => {
    try {
        const { userId, username, email, playerId, provider, amount, orderId, payeeAccount } = req.body;
        
        // Validate required fields
        const requiredFields = ['userId', 'username', 'email', 'playerId', 'provider', 'amount', 'orderId', 'payeeAccount'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate amount is a positive number
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Amount must be a positive number"
            });
        }

        // Validate provider is supported
        const supportedProviders = ['bkash', 'nagad', 'rocket', 'bank'];
        if (!supportedProviders.includes(provider)) {
            return res.status(400).json({ 
                success: false, 
                message: `Unsupported provider. Supported providers are: ${supportedProviders.join(', ')}`
            });
        }

        // Validate the user
        const user = await UserModel.findById(userId).select('+transactionPassword');
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found." 
            });
        }

        // Verify user identity
        if (user.username !== username || user.email !== email || user.player_id !== playerId) {
            return res.status(403).json({ 
                success: false, 
                message: "User credentials don't match" 
            });
        }

        // Check if user can withdraw
        const withdrawalCheck = user.canWithdraw(amount);
        if (!withdrawalCheck.canWithdraw) {
            return res.status(400).json({ 
                success: false, 
                message: withdrawalCheck.reason 
            });
        }

        // Create withdrawal request
        const newWithdrawal = new Withdrawmodel({
            userId,
            provider,
            amount,
            orderId,
            payeeAccount,
            name: username,
            email,
            playerId,
            post_balance: user.balance - amount,
            recieved_amount: withdrawalCheck.netAmount,
            tax_amount: withdrawalCheck.commission,
            status: 'pending',
            processedAt: null,
            completedAt: null
        });

        // Deduct balance from user
        user.balance -= amount;
        user.total_withdraw += amount;

        // Add to transaction history
        user.transactionHistory.push({
            type: 'withdrawal',
            amount: amount,
            balanceBefore: user.balance + amount,
            balanceAfter: user.balance,
            description: `Withdrawal via ${provider}`,
            referenceId: orderId
        });

        // Save both user and withdrawal in transaction
        await Promise.all([
            newWithdrawal.save(),
            user.save()
        ]);

        res.status(201).json({ 
            success: true, 
            message: "Withdrawal request submitted successfully!",
            data: {
                withdrawalId: newWithdrawal._id,
                amount: amount,
                netAmount: withdrawalCheck.netAmount,
                commission: withdrawalCheck.commission,
                newBalance: user.balance,
                status: 'pending'
            }
        });

    } catch (error) {
        console.error("Payout error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Internal server error" 
        });
    }
});
user_route.get("/withdrawals/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        const { page = 1, limit = 10, status } = req.query;
         console.log(userid)
        // Validate user exists
        const userExists = await UserModel.exists({ _id: userid });
        if (!userExists) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Build query
        const query = { userid };
        if (status) {
            query.status = status;
        }

        // Get paginated withdrawals
        const withdrawals = await Withdrawmodel.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        // Get total count for pagination
        const total = await Withdrawmodel.countDocuments(query);

        res.json({
            success: true,
            data: withdrawals,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("Withdrawal history error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message || "Internal server error" 
        });
    }
});
  // Get user's withdrawals
user_route.get("/withdrawal/:userId",async (req, res) => {
    try {
      const withdrawals = await Withdrawmodel.find({ userId: req.params.userId });
      res.send({success:true,data:withdrawals});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error." });
    }
});
  // Admin approves/rejects a withdrawal
user_route.put("/update/:id", async (req, res) => {
    try {
      const { status } = req.body;
      const withdrawal = await Withdrawmodel.findById(req.params.id);
  
      if (!withdrawal) return res.status(404).json({ success: false, message: "Withdrawal not found." });
  
      withdrawal.status = status;
      await withdrawal.save();
  
      res.json({ success: true, message: `Withdrawal ${status}.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  });
  // ----------------otp-send-------------------
  const otpStorage = {}; // Temporary OTP storage

  // 📨 Send OTP
  user_route.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
  
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      // Update OTP in the user document
      user.otp = {
        code: otp.toString(),   // Store as a string to prevent formatting issues
        expiresAt: Date.now() + 300000, // 5 minutes expiry
      };
      await user.save();  // Save to the database
  
      // Send email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shihabmoni15@gmail.com",
          pass: "cdir niov oqpo didg", // Use environment variables for security
        },
      });
  
      const mailOptions = {
        from: "HoBet Support <shihabmoni15@gmail.com>",
        to: email,
        subject: "🔒 Reset Your Password - HoBet Account",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4A90E2; text-align: center;">HoBet Password Reset</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password for your HoBet account. If you did not make this request, you can safely ignore this email.</p>
            <p style="text-align: center; font-size: 18px; font-weight: bold; color: #333;">Your OTP Code:</p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #4A90E2; padding: 10px; border: 2px dashed #4A90E2; display: inline-block; margin: auto;">
              ${otp}
            </div>
            <p style="text-align: center; font-size: 14px; color: #555;">This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</p>
            <p>If you need further assistance, please contact our support team.</p>
            <p style="margin-top: 20px; font-size: 14px; color: #777;">Best Regards,<br><strong>HoBet Support Team</strong></p>
          </div>
        `,
      };
  
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error("Error sending OTP email:", error);
          return res.status(500).json({ error: "Failed to send OTP" });
        }
        res.json({ message: "OTP sent! It will expire in 5 minutes. Please check your email and enter the OTP." });
      });
  
    } catch (error) {
      console.error("Error in /send-otp:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // ✅ Verify OTP
  user_route.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      // Find user by email
      const user = await UserModel.findOne({ email });
      console.log(user)
      if (!user) {
        return res.json({ success:false,message: "User not found" });
      }
  
      // Check if OTP exists
      if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
        return res.json({  success:false,message:"OTP expired or invalid" });
      }
  
      // Check if OTP is expired
      if (Date.now() > user.otp.expiresAt) {
        return res.json({ success:false,message: "OTP has expired" });
      }
  
      // Verify OTP
      if (otp !== user.otp.code) {
        return res.json({ success:false,message:"Invalid OTP" });
      }
  
      // OTP is correct → Clear OTP after verification
      user.otp = { code: null, expiresAt: null };
      await user.save();
  
      res.json({success:true,message: "OTP verified successfully!" });
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // 🔑 Reset Password
  user_route.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  
    res.json({ message: "Password reset successfully" });
  });
  


  // ==================== NEW ROUTES ====================

// 1. Add Mobile Number with Transaction Password
user_route.post("/add-mobile", ensureAuthenticated, async (req, res) => {
    try {
        const { userId, mobileNumber, transactionPassword } = req.body;
        
        // Validate mobile number format
        if (!/^[0-9]{10,15}$/.test(mobileNumber)) {
            return res.status(400).json({ 
                success: false, 
                message: "মোবাইল নম্বরের ফরম্যাট সঠিক নয়" 
            });
        }

        // Check if mobile already exists
        const existingUser = await UserModel.findOne({ phone: mobileNumber });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "এই মোবাইল নম্বরটি ইতিমধ্যে রেজিস্টার্ড" 
            });
        }

        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "ব্যবহারকারী খুঁজে পাওয়া যায়নি" 
            });
        }

        // Hash the transaction password
        const salt = await bcrypt.genSalt(10);
        const hashedTransactionPassword = await bcrypt.hash(transactionPassword, salt);

        // Update user
        user.phone = mobileNumber;
        user.transactionPassword = hashedTransactionPassword;
        user.isPhoneVerified = false;

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "মোবাইল নম্বর এবং ট্রানজেকশন পাসওয়ার্ড সফলভাবে সংযুক্ত হয়েছে" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "সার্ভার সমস্যা" 
        });
    }
});

// 2. Update Transaction Password
user_route.put("/update-transaction-password", ensureAuthenticated, async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        // Find user
        const user = await UserModel.findById(userId).select('+transactionPassword');
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "ব্যবহারকারী খুঁজে পাওয়া যায়নি" 
            });
        }

        // Verify current transaction password
        const isMatch = await bcrypt.compare(currentPassword, user.transactionPassword);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "বর্তমান ট্রানজেকশন পাসওয়ার্ড ভুল" 
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.transactionPassword = hashedPassword;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "ট্রানজেকশন পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "সার্ভার সমস্যা" 
        });
    }
});

// 3. Get Deposit History
user_route.get("/deposit-history/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const deposits = await transaction_model.find({ 
            customer_id: req.params.userId,
            type: 'deposit'
        }).sort({ createdAt: -1 });

        res.status(200).json({ 
            success: true, 
            data: deposits 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// 4. Get Withdrawal History
user_route.get("/withdrawal-history/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const withdrawals = await Withdrawmodel.find({ 
            userId: req.params.userId 
        }).sort({ createdAt: -1 });

        res.status(200).json({ 
            success: true, 
            data: withdrawals 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// 5. Get Bet History
user_route.get("/bet-history/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: user.betHistory 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// 6. Get Referral History
user_route.get("/referral-history/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
            .populate('referralUsers', 'username createdAt');

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: {
                referralCode: user.referralCode,
                referralCount: user.referralCount,
                referralEarnings: user.referralEarnings,
                referredUsers: user.referralUsers
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// 7. Update Account Password
// 7. Update Account Password
user_route.put("/update-account-password", ensureAuthenticated, async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        // Find user with password
        const user = await UserModel.findById(userId).select('+password');
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "ব্যবহারকারী খুঁজে পাওয়া যায়নি" 
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "বর্তমান পাসওয়ার্ডটি ভুল" 
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "অ্যাকাউন্ট পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "সার্ভার সমস্যা" 
        });
    }
});


// ============================all-refer-details==============================
// 8. Get Referral Bonus Details
user_route.get("/referral-bonus-details/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Get all transactions where type is referral bonus
        const referralBonuses = await transaction_model.find({
            customer_id: req.params.userId,
            type: 'referral_bonus'
        }).sort({ createdAt: -1 });

        res.status(200).json({ 
            success: true, 
            data: {
                totalReferralEarnings: user.referralEarnings || 0,
                referralCount: user.referralCount || 0,
                referralCode: user.referralCode || '',
                bonusHistory: referralBonuses,
                bonusRate: process.env.REFERRAL_BONUS_RATE || '10%' // Default 10% if not set
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// 9. Get Detailed Referred Users Information
user_route.get("/referred-users-details/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
            .populate({
                path: 'referralUsers.user',
                select: 'username email phone balance deposit_money createdAt lastLogin'
            });

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Calculate statistics
        const activeReferrals = user.referralUsers.filter(u => u.user.lastLogin > Date.now() - 30*24*60*60*1000).length;
        const depositedReferrals = user.referralUsers.filter(u => u.user.deposit_money > 0).length;

        res.status(200).json({ 
            success: true, 
            data: {
                referralCode: user.referralCode,
                totalReferrals: user.referralCount || 0,
                activeReferrals,
                depositedReferrals,
                referralEarnings: user.referralEarnings || 0,
                referredUsers: user.referralUsers.map(ref => ({
                    id: ref.user._id,
                    username: ref.user.username,
                    email: ref.user.email,
                    phone: ref.user.phone || 'Not provided',
                    balance: ref.user.balance,
                    joinDate: ref.user.createdAt,
                    lastActive: ref.user.lastLogin,
                    hasDeposited: ref.user.deposit_money > 0,
                    earnedAmount: ref.earnedAmount
                })),
                totalDepositsByReferrals: user.referralUsers.reduce((sum, ref) => sum + (ref.user.deposit_money || 0), 0)
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// Helper function to format mobile number (similar to your frontend)
function formatMobileNumber(number) {
    if (!number || number.length < 7) return number;
    const firstPart = number.substring(0, 4);
    const lastPart = number.substring(number.length - 3);
    return `${firstPart}****${lastPart}`;
}

// 10. Generate New Referral Code
user_route.post("/generate-referral-code/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Generate a random 8-character alphanumeric code
        const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        user.referralCode = newCode;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "New referral code generated",
            referralCode: newCode
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});
// 11. Claim Referral Bonus
user_route.post("/claim-referral-bonus/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        if (user.referralEarnings <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No referral earnings to claim" 
            });
        }

        // Add to balance
        const bonusAmount = user.referralEarnings;
        user.balance += bonusAmount;
        
        // Create transaction record
        const newTransaction = new transaction_model({
            customer_id: user._id,
            customer_name: user.username,
            customer_email: user.email,
            payment_type: 'referral_bonus',
            amount: bonusAmount,
            post_balance: user.balance,
            transaction: `REFBONUS-${Date.now()}`,
            type: 'referral_bonus',
            status: 'success'
        });

        // Reset referral earnings
        user.referralEarnings = 0;
        
        await Promise.all([user.save(), newTransaction.save()]);

        res.status(200).json({ 
            success: true, 
            message: `$${bonusAmount} referral bonus claimed successfully`,
            newBalance: user.balance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});
// 12. Get Referral Statistics
user_route.get("/referral-stats/:userId", ensureAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Calculate statistics
        const referredUsers = await UserModel.find({ referredBy: user._id });
        
        const activeReferrals = referredUsers.filter(u => u.lastLogin > Date.now() - 30*24*60*60*1000).length;
        const depositedReferrals = referredUsers.filter(u => u.deposit_money > 0).length;
        const totalDeposits = referredUsers.reduce((sum, u) => sum + (u.deposit_money || 0), 0);
        
        res.status(200).json({ 
            success: true, 
            data: {
                referralCode: user.referralCode,
                totalReferrals: user.referralCount || 0,
                activeReferrals,
                depositedReferrals,
                totalDepositsByReferrals: totalDeposits,
                referralEarnings: user.referralEarnings || 0,
                potentialEarnings: totalDeposits * (process.env.REFERRAL_BONUS_RATE || 0.1), // Assuming 10% bonus rate
                bonusRate: process.env.REFERRAL_BONUS_RATE || '10%'
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});


module.exports=user_route;
