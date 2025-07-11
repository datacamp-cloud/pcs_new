const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  code: { type: String },
  isPhoneVerified: { type: Boolean, default: false },
  isIdentityVerified: { type: Boolean, default: false },
  fullVerification: { type: Boolean, default: false },

  status: { type: String, default: 'freemium' },

  firstName: { type: String },
  lastName: { type: String },
  email: { type: String }, 
  birthday: { type: String },
  address: { type: String }, 
  gender: { type: String },

  solde: { type: Number, default: 0 },

  otp: { type: String },
  otpExpires: { type: Date },

  selfieUrl: { type: String },
  docFrontUrl: { type: String },
  docBackUrl: { type: String },
});

module.exports = mongoose.model('User', userSchema);
