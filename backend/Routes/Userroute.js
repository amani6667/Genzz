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
user_route.post("/payout",async (req, res) => {
    try {
      const { userId,username,email,playerId,provider, amount, orderId, payeeAccount,post_balance,recieved_amount,tax_amount } = req.body;
      console.log(req.body)
      // Validate the user
      const user = await UserModel.findById(userId);
      if (!user) return res.status(400).json({ success: false, message: "User not found." });
  
      // Check balance
      if (user.balance < amount) {
        return res.status(400).json({ success: false, message: "Insufficient balance." });
      }
  
      // Create withdrawal request
      const newWithdrawal = new Withdrawmodel({
        userId,
        provider,
        amount,
        orderId,
        payeeAccount,
        name:username,
        email,
        playerId,
        post_balance,
        recieved_amount,
        tax_amount
      });
  
      await newWithdrawal.save();
  
      // Deduct balance
      user.balance -= amount;
      user.transactions+=1;
      await user.save();
  
      res.json({ success: true, message: "Withdrawal request submitted!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error." });
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
                message: "Invalid mobile number format" 
            });
        }

        // Check if mobile already exists
        const existingUser = await UserModel.findOne({ phone: mobileNumber });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Mobile number already registered" 
            });
        }

        // Find the user
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Hash the transaction password
        const salt = await bcrypt.genSalt(10);
        const hashedTransactionPassword = await bcrypt.hash(transactionPassword, salt);

        // Update user
        user.phone = mobileNumber;
        user.transactionPassword = hashedTransactionPassword;
        user.isPhoneVerified = false; // You might want to verify via OTP later

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Mobile number and transaction password added successfully" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
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
                message: "User not found" 
            });
        }

        // Verify current transaction password
        const isMatch = await bcrypt.compare(currentPassword, user.transactionPassword);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Current transaction password is incorrect" 
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
            message: "Transaction password updated successfully" 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
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
user_route.put("/update-account-password", ensureAuthenticated, async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        // Find user with password
        const user = await UserModel.findById(userId).select('+password');
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Current password is incorrect" 
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
            message: "Account password updated successfully" 
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
