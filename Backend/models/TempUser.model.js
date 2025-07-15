const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
   createdAt: {
    type: Date,
    default: Date.now,
    expires: 400,
  },
});

TempUserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 300 });

const TempUser = mongoose.model("TempUser", TempUserSchema);

module.exports = TempUser;
