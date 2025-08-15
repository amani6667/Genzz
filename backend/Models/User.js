const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Configuration
const SALT_WORK_FACTOR = 10;
const PASSWORD_MIN_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5; // OTP expires after 5 minutes
const BONUS_CONFIG = {
  BONUS_EXPIRY_DAYS: 30,
  FIRST_DEPOSIT_BONUS_RATE: 0.03, // 3%
  SPECIAL_BONUS_RATE: 1.5, // 150%
  WAGERING_REQUIREMENT: 30 // 30x
};

const UserSchema = new Schema({
    // ========== BASIC INFORMATION ==========
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        minlength: 4,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores']
    },
    password: {
        type: String,
        required: function() { return !this.isOneClickUser; },
        select: false,
        minlength: PASSWORD_MIN_LENGTH
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    avatar: {
        type: String,
        default: "https://images.5943920202.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"
    },

    // ========== ACCOUNT INFORMATION ==========
    player_id: {
        type: String,
        required: true,
        unique: true
    },
    isOneClickUser: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'agent', 'admin', 'super_admin'],
        default: "user"
    },
    status: {
        type: String,
        enum: ['active', 'banned', 'deactivated', 'pending'],
        default: 'active',
    },
    language: {
        type: String,
        enum: ['en', 'bn', 'hi', 'ar'],
        default: 'bn'
    },
    first_login: {
        type: Boolean,
        default: true
    },
    last_login: {
        type: Date
    },
    login_count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    // ========== FINANCIAL INFORMATION ==========
    currency: {
        type: String,
        default: "BDT"
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    bonusBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    total_deposit: {
        type: Number,
        default: 0,
        min: 0
    },
    total_withdraw: {
        type: Number,
        default: 0,
        min: 0
    },
    total_bet: {
        type: Number,
        default: 0,
        min: 0
    },
    total_wins: {
        type: Number,
        default: 0,
        min: 0
    },
    total_loss: {
        type: Number,
        default: 0,
        min: 0
    },
    net_profit: {
        type: Number,
        default: 0
    },
    totalWagered: {
        type: Number,
        default: 0
    },
    dailyWithdrawalLimit: {
        type: Number,
        default: 50000 // 50,000 BDT default daily limit
    },
    withdrawalCountToday: {
        type: Number,
        default: 0
    },
    lastWithdrawalDate: {
        type: Date
    },

    // ========== BONUS INFORMATION ==========
    bonusInfo: {
        firstDepositBonusClaimed: {
            type: Boolean,
            default: false
        },
        activeBonuses: [{
            bonusType: {
                type: String,
                enum: ['first_deposit', 'special_bonus'],
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            originalAmount: {
                type: Number,
                required: true
            },
            wageringRequirement: {
                type: Number,
                required: true,
                default: BONUS_CONFIG.WAGERING_REQUIREMENT
            },
            amountWagered: {
                type: Number,
                default: 0
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            expiresAt: {
                type: Date,
                default: function() {
                    const date = new Date();
                    date.setDate(date.getDate() + BONUS_CONFIG.BONUS_EXPIRY_DAYS);
                    return date;
                }
            },
            status: {
                type: String,
                enum: ['active', 'completed', 'expired', 'cancelled'],
                default: 'active'
            }
        }],
        bonusWageringTotal: {
            type: Number,
            default: 0
        },
        cancelledBonuses: [{
            bonusType: String,
            amount: Number,
            penaltyApplied: Number,
            cancelledAt: Date
        }]
    },

    // ========== SECURITY ==========
    transactionPassword: {
        type: String,
        select: false
    },
    moneyTransferPassword: {
        type: String,
        select: false
    },
    isMoneyTransferPasswordSet: {
        type: Boolean,
        default: false
    },
    otp: {
        code: String,
        expiresAt: Date,
        purpose: String, // 'password-reset', 'password-change', 'email-verification', etc.
        verified: { type: Boolean, default: false }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: String,
    passwordHistory: [{
        password: String,
        changedAt: Date
    }],
    lastPasswordChange: Date,

    // ========== ACTIVITY TRACKING ==========
    loginHistory: [{
        ipAddress: String,
        device: String,
        userAgent: String,
        location: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    deviceTokens: [{
        token: String,
        deviceType: String,
        lastUsed: Date
    }],

    // ========== PREFERENCES ==========
    notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true }
    },
    themePreference: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'dark'
    },

    // ========== VERIFICATION ==========
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    kycStatus: {
        type: String,
        enum: ['unverified', 'pending', 'verified', 'rejected'],
        default: 'unverified'
    },
    kycDocuments: [{
        documentType: String,
        frontImage: String,
        backImage: String,
        status: String,
        submittedAt: Date,
        verifiedAt: Date
    }],

    // ========== REFERRAL SYSTEM ==========
    referralCode: {
        type: String,
        unique: true,
        sparse: true
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    referralEarnings: {
        type: Number,
        default: 0
    },
    referralCount: {
        type: Number,
        default: 0
    },
    referralUsers: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        earnedAmount: {
            type: Number,
            default: 0
        }
    }],
    referralTracking: [{
        referralCodeUsed: String,
        referredUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],

    // ========== TRANSACTION HISTORIES ==========
    betHistory: [{
        game: String,
        amount: Number,
        result: { type: String, enum: ['win', 'loss', 'pending', 'draw'], default: 'pending' },
        payout: Number,
        createdAt: { type: Date, default: Date.now }
    }],
    profitLossHistory: [{
        type: { type: String, enum: ['profit', 'loss'], required: true },
        amount: Number,
        reason: String,
        date: { type: Date, default: Date.now }
    }],
    depositHistory: [{
        method: {
            type: String,
            enum: ['bkash', 'nagad', 'rocket', 'bank'],
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 100
        },
        status: { 
            type: String, 
            enum: ['pending', 'completed', 'failed', 'cancelled'], 
            default: 'pending' 
        },
        transactionId: String,
        bonusApplied: {
            type: Boolean,
            default: false
        },
        bonusType: {
            type: String,
            default: 'none'
        },
        bonusAmount: {
            type: Number,
            default: 0
        },
        orderId: String,
        paymentUrl: String,
        processedAt: Date,
        completedAt: Date,
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }],
    withdrawHistory: [{
        method: {
            type: String,
            enum: ['bkash', 'nagad', 'rocket', 'bank'],
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 300
        },
        netAmount: {
            type: Number,
            required: true
        },
        status: { 
            type: String, 
            enum: ['pending', 'processing', 'completed', 'rejected', 'cancelled'], 
            default: 'pending' 
        },
        accountNumber: {
            type: String,
            required: true
        },
        transactionId: String,
        orderId: String,
        bonusCancelled: {
            type: Boolean,
            default: false
        },
        bonusPenalty: {
            type: Number,
            default: 0
        },
        commissionApplied: {
            type: Boolean,
            default: false
        },
        commissionAmount: {
            type: Number,
            default: 0
        },
        processedAt: Date,
        completedAt: Date,
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }],
    transactionHistory: [{
        type: {
            type: String,
            enum: ['deposit', 'withdrawal', 'bonus', 'bet', 'win', 'penalty'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        balanceBefore: {
            type: Number,
            required: true
        },
        balanceAfter: {
            type: Number,
            required: true
        },
        description: String,
        referenceId: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            // Remove sensitive information
            delete ret.password;
            delete ret.transactionPassword;
            delete ret.moneyTransferPassword;
            delete ret.twoFactorSecret;
            delete ret.resetPasswordToken;
            delete ret.resetPasswordExpires;
            delete ret.otp;
            delete ret.passwordHistory;
            return ret;
        }
    }
});

// ========== VIRTUALS ==========
UserSchema.virtual('formattedBalance').get(function() {
    return this.balance.toFixed(2);
});

UserSchema.virtual('accountAgeInDays').get(function() {
    return Math.floor((new Date() - new Date(this.createdAt)) / (1000 * 60 * 60 * 24));
});

UserSchema.virtual('isNewUser').get(function() {
    return this.accountAgeInDays < 3;
});

UserSchema.virtual('availableBalance').get(function() {
    let available = this.balance || 0;
    
    // If user has bonus and hasn't cancelled it
    if (this.bonusBalance > 0) {
        return 0; // Can't withdraw from main balance until bonus is cleared
    }
    
    // Check wagering requirements
    if (this.total_deposit > 0) {
        const wageringRequirement = this.total_deposit * 3;
        const wageringCompleted = this.totalWagered || 0;
        
        if (wageringCompleted < wageringRequirement) {
            // If they want to withdraw without completing, apply 20% commission
            return available * 0.8; // 20% commission
        }
    }
    
    return available;
});

UserSchema.virtual('fullProfile').get(function() {
    return {
        username: this.username,
        email: this.email,
        phone: this.phone,
        balance: this.balance,
        bonusBalance: this.bonusBalance,
        status: this.status,
        role: this.role,
        totalDeposit: this.total_deposit,
        totalWithdraw: this.total_withdraw
    };
});

// ========== PRE-SAVE HOOKS ==========
UserSchema.pre('save', async function(next) {
    // Generate player_id if not set
    if (!this.player_id) {
        this.player_id = 'PL' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    // Generate referral code if not set
    if (!this.referralCode) {
        this.referralCode = 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    // Hash passwords if modified
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        
        // Store password in history
        if (this.passwordHistory) {
            this.passwordHistory.push({
                password: this.password,
                changedAt: new Date()
            });
        } else {
            this.passwordHistory = [{
                password: this.password,
                changedAt: new Date()
            }];
        }
        
        // Keep only last 5 passwords
        if (this.passwordHistory.length > 5) {
            this.passwordHistory = this.passwordHistory.slice(-5);
        }
        
        this.lastPasswordChange = new Date();
    }

    if (this.isModified('transactionPassword')) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.transactionPassword = await bcrypt.hash(this.transactionPassword, salt);
    }

    if (this.isModified('moneyTransferPassword')) {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.moneyTransferPassword = await bcrypt.hash(this.moneyTransferPassword, salt);
        this.isMoneyTransferPasswordSet = true;
    }

    // Reset daily withdrawal count if it's a new day
    if (this.isModified('lastWithdrawalDate')) {
        const today = new Date().toDateString();
        const lastWithdrawalDay = this.lastWithdrawalDate ? new Date(this.lastWithdrawalDate).toDateString() : null;
        
        if (!lastWithdrawalDay || today !== lastWithdrawalDay) {
            this.withdrawalCountToday = 0;
        }
    }

    next();
});

// ========== METHODS ==========
// Verify password
UserSchema.methods.verifyPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Verify transaction password
UserSchema.methods.verifyTransactionPassword = async function(candidatePassword) {
    if (!this.transactionPassword) return false;
    return await bcrypt.compare(candidatePassword, this.transactionPassword);
};

// Verify money transfer password
UserSchema.methods.verifyMoneyTransferPassword = async function(candidatePassword) {
    if (!this.moneyTransferPassword) return false;
    return await bcrypt.compare(candidatePassword, this.moneyTransferPassword);
};

// Set money transfer password
UserSchema.methods.setMoneyTransferPassword = async function(newPassword) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.moneyTransferPassword = await bcrypt.hash(newPassword, salt);
    this.isMoneyTransferPasswordSet = true;
    return this.save();
};

// Update last login
UserSchema.methods.updateLastLogin = async function() {
    this.last_login = Date.now();
    this.login_count += 1;
    if (this.first_login) this.first_login = false;
    return this.save();
};

// Generate OTP for password change
UserSchema.methods.generatePasswordChangeOTP = function() {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    
    this.otp = {
        code: otpCode,
        expiresAt: expiresAt,
        purpose: 'password-change',
        verified: false
    };
    
    return this.save();
};

// Verify OTP for password change
UserSchema.methods.verifyPasswordChangeOTP = async function(otpCode) {
    if (!this.otp || this.otp.purpose !== 'password-change') {
        throw new Error('No active password change OTP');
    }
    
    if (this.otp.expiresAt < new Date()) {
        throw new Error('OTP has expired');
    }
    
    if (this.otp.code !== otpCode) {
        throw new Error('Invalid OTP');
    }
    
    this.otp.verified = true;
    await this.save();
    return true;
};

// Change password with OTP verification
UserSchema.methods.changePasswordWithOTP = async function(newPassword, otpCode) {
    // Verify OTP first
    await this.verifyPasswordChangeOTP(otpCode);
    
    // Check if new password is in history
    const isUsed = await Promise.all(
        this.passwordHistory.map(async oldPassword => {
            return await bcrypt.compare(newPassword, oldPassword.password);
        })
    );
    
    if (isUsed.includes(true)) {
        throw new Error('Cannot use a previously used password');
    }
    
    // Change the password
    this.password = newPassword;
    this.otp = undefined; // Clear OTP after successful change
    await this.save();
    
    return true;
};

// Check if password has been used before
UserSchema.methods.hasUsedPassword = async function(password) {
    if (!this.passwordHistory || this.passwordHistory.length === 0) {
        return false;
    }
    
    const isUsed = await Promise.all(
        this.passwordHistory.map(async oldPassword => {
            return await bcrypt.compare(password, oldPassword.password);
        })
    );
    
    return isUsed.includes(true);
};

// Deposit method
UserSchema.methods.createDeposit = async function({ method, amount, bonusType = 'none' }) {
    // Validate amount
    if (amount < 100 || amount > 30000) {
        throw new Error('Deposit amount must be between 100 and 30,000 BDT');
    }

    // Create deposit record
    const deposit = {
        method,
        amount,
        status: 'pending',
        bonusType,
        orderId: `DEP-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    this.depositHistory.push(deposit);
    await this.save();

    return deposit;
};

// Complete deposit method
UserSchema.methods.completeDeposit = async function(orderId, transactionId, bonusAmount = 0) {
    const deposit = this.depositHistory.find(d => d.orderId === orderId && d.status === 'pending');
    
    if (!deposit) {
        throw new Error('Pending deposit not found');
    }

    // Update deposit status
    deposit.status = 'completed';
    deposit.transactionId = transactionId;
    deposit.completedAt = new Date();
    deposit.bonusAmount = bonusAmount;
    deposit.bonusApplied = bonusAmount > 0;

    // Update balance
    this.balance += deposit.amount;
    this.total_deposit += deposit.amount;

    // Handle bonus if applicable
    if (bonusAmount > 0) {
        this.bonusBalance += bonusAmount;
        
        // Add to active bonuses if it's a special bonus
        if (deposit.bonusType === 'special_bonus') {
            this.bonusInfo.activeBonuses.push({
                bonusType: 'special_bonus',
                amount: bonusAmount,
                originalAmount: bonusAmount,
                wageringRequirement: BONUS_CONFIG.WAGERING_REQUIREMENT
            });
        }
        
        // Mark first deposit bonus as claimed if applicable
        if (deposit.bonusType === 'first_deposit' && !this.bonusInfo.firstDepositBonusClaimed) {
            this.bonusInfo.firstDepositBonusClaimed = true;
        }
    }

    // Add transaction record
    this.transactionHistory.push({
        type: 'deposit',
        amount: deposit.amount,
        balanceBefore: this.balance - deposit.amount,
        balanceAfter: this.balance,
        description: `Deposit via ${deposit.method}`,
        referenceId: transactionId
    });

    await this.save();
    return deposit;
};

// Create withdrawal request
UserSchema.methods.createWithdrawal = async function({ method, amount, accountNumber }) {
    // Validate amount
    if (amount < 300) {
        throw new Error('Minimum withdrawal amount is 300 BDT');
    }

    // Check available balance
    const availableBalance = this.availableBalance;
    if (amount > availableBalance) {
        throw new Error(`Insufficient balance. Available: ${availableBalance.toFixed(2)} BDT`);
    }

    // Check daily withdrawal limit
    const today = new Date().toDateString();
    const lastWithdrawalDay = this.lastWithdrawalDate ? new Date(this.lastWithdrawalDate).toDateString() : null;
    
    if (lastWithdrawalDay && today === lastWithdrawalDay && this.withdrawalCountToday >= 3) {
        throw new Error('Maximum 3 withdrawals allowed per day');
    }

    // Create withdrawal record
    const withdrawal = {
        method,
        amount,
        netAmount: amount,
        accountNumber,
        status: 'pending',
        orderId: `WD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    // Apply commission if wagering requirements not met
    if (this.total_deposit > 0 && (this.totalWagered || 0) < (this.total_deposit * 3)) {
        withdrawal.commissionApplied = true;
        withdrawal.commissionAmount = amount * 0.2;
        withdrawal.netAmount = amount * 0.8;
    }

    this.withdrawHistory.push(withdrawal);
    this.withdrawalCountToday += 1;
    this.lastWithdrawalDate = new Date();
    
    await this.save();
    return withdrawal;
};

// Complete withdrawal method
UserSchema.methods.completeWithdrawal = async function(orderId, transactionId) {
    const withdrawal = this.withdrawHistory.find(w => w.orderId === orderId && w.status === 'pending');
    
    if (!withdrawal) {
        throw new Error('Pending withdrawal not found');
    }

    // Update withdrawal status
    withdrawal.status = 'completed';
    withdrawal.transactionId = transactionId;
    withdrawal.completedAt = new Date();

    // Update balance
    this.balance -= withdrawal.amount;
    this.total_withdraw += withdrawal.amount;

    // Add transaction record
    this.transactionHistory.push({
        type: 'withdrawal',
        amount: withdrawal.amount,
        balanceBefore: this.balance + withdrawal.amount,
        balanceAfter: this.balance,
        description: `Withdrawal via ${withdrawal.method}`,
        referenceId: transactionId
    });

    await this.save();
    return withdrawal;
};

// Cancel withdrawal method
UserSchema.methods.cancelWithdrawal = async function(orderId, reason = 'User cancelled') {
    const withdrawal = this.withdrawHistory.find(w => w.orderId === orderId && w.status === 'pending');
    
    if (!withdrawal) {
        throw new Error('Pending withdrawal not found');
    }

    withdrawal.status = 'cancelled';
    withdrawal.processedAt = new Date();
    withdrawal.reason = reason;

    // Decrement withdrawal count if it's the same day
    const today = new Date().toDateString();
    const withdrawalDay = new Date(withdrawal.createdAt).toDateString();
    
    if (today === withdrawalDay) {
        this.withdrawalCountToday = Math.max(0, this.withdrawalCountToday - 1);
    }

    await this.save();
    return withdrawal;
};

// Apply bet to wagering requirements
UserSchema.methods.applyBetToWagering = async function(amount) {
    this.totalWagered += amount;
    this.total_bet += amount;

    // Update active bonuses
    if (this.bonusInfo.activeBonuses.length > 0) {
        for (const bonus of this.bonusInfo.activeBonuses) {
            if (bonus.status === 'active') {
                bonus.amountWagered += amount;
                
                // Check if wagering requirement is met
                if (bonus.amountWagered >= (bonus.originalAmount * bonus.wageringRequirement)) {
                    bonus.status = 'completed';
                }
            }
        }
        
        // Remove completed bonuses
        this.bonusInfo.activeBonuses = this.bonusInfo.activeBonuses.filter(b => b.status !== 'completed');
    }

    await this.save();
};

// Cancel bonus with penalty
UserSchema.methods.cancelBonusWithPenalty = async function() {
    if (this.bonusBalance <= 0) {
        throw new Error('No active bonus to cancel');
    }

    const penaltyAmount = this.bonusBalance * 1.5; // 150% penalty
    
    // Deduct penalty from main balance
    if (this.balance < penaltyAmount) {
        throw new Error('Insufficient balance to pay penalty');
    }

    this.balance -= penaltyAmount;
    
    // Record cancelled bonus
    this.bonusInfo.cancelledBonuses.push({
        bonusType: 'special_bonus', // Assuming it's always special bonus for now
        amount: this.bonusBalance,
        penaltyApplied: penaltyAmount,
        cancelledAt: new Date()
    });

    // Clear bonus balance
    this.bonusBalance = 0;
    
    // Mark all active bonuses as cancelled
    this.bonusInfo.activeBonuses = this.bonusInfo.activeBonuses.map(bonus => {
        if (bonus.status === 'active') {
            bonus.status = 'cancelled';
        }
        return bonus;
    });

    // Add transaction record
    this.transactionHistory.push({
        type: 'penalty',
        amount: penaltyAmount,
        balanceBefore: this.balance + penaltyAmount,
        balanceAfter: this.balance,
        description: 'Bonus cancellation penalty',
        referenceId: `PEN-${Date.now()}`
    });

    await this.save();
    return penaltyAmount;
};

// ========== STATICS ==========
// One-click registration
UserSchema.statics.oneClickRegister = async function(username) {
    const existingUser = await this.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    return this.create({
        username,
        isOneClickUser: true,
        player_id: 'PL' + Math.random().toString(36).substr(2, 8).toUpperCase()
    });
};

// Find by credentials
UserSchema.statics.findByCredentials = async function(username, password) {
    const user = await this.findOne({ username }).select('+password');
    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await user.verifyPassword(password);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return user;
};

// Find by email or phone for password reset
UserSchema.statics.findByEmailOrPhone = async function(emailOrPhone) {
    return this.findOne({
        $or: [
            { email: emailOrPhone },
            { phone: emailOrPhone }
        ]
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;