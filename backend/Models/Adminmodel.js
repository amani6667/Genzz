const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    is_admin: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['active', 'inacive'],
        default: 'active',
    },
    created_by:{
        type:String,
        default:""
     },
    role: {
        type: String,
        enum: ['admin', 'sub-admin', 'super-admin'],
        default: 'admin'
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
