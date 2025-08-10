const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Configuration
const SALT_WORK_FACTOR = 10;
const PASSWORD_MIN_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5; // OTP expires after 5 minutes

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
    bonus: {
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

    // ========== HISTORIES ==========
    betHistory: [{
        game: String,
        amount: Number,
        result: { type: String, enum: ['win', 'loss', 'pending'], default: 'pending' },
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
        method: String,
        amount: Number,
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        transactionId: String,
        date: { type: Date, default: Date.now }
    }],
    withdrawHistory: [{
        method: String,
        amount: Number,
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        transactionId: String,
        date: { type: Date, default: Date.now }
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

UserSchema.virtual('fullProfile').get(function() {
    return {
        username: this.username,
        email: this.email,
        phone: this.phone,
        balance: this.balance,
        status: this.status,
        role: this.role
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