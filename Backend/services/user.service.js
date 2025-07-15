const userModel = require("../models/user.model");
const TempUserModel = require("../models/tempUser.model");

module.exports.CreateTempUser = async ({ name, email, password, otp }) => {
  if (!name || !email || !password || !otp) {
    throw new Error("All fields are required");
  }

  const existingUser = await userModel.findOne({
    email: email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  const tempUser = await TempUserModel.create({
    name,
    email,
    password,
    otp,
    otpExpiry: otpExpiryTime,
  });
  return tempUser;
};

module.exports.VerifyandCreateUser = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const tempUser = await TempUserModel.findOne({ email });
  if (!tempUser) {
    throw new Error("Invalid email or OTP");
  }

  if (tempUser.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (tempUser.otpExpiry < new Date()) {
    throw new Error("OTP has expired");
  }

  const user = await userModel.create({
    name: tempUser.name,
    email: tempUser.email,
    password: tempUser.password,
  });

  await TempUserModel.deleteOne({ _id: tempUser._id });

  return user;
};
