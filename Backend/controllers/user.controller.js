const userServices = require("../services/user.service");
const TempUserModel = require("../models/tempUser.model");
const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const transporter = require("../services/Sendmail.service");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const Isuser = await TempUserModel.findOne({ email: email });
    if (Isuser) {
      return res.status(400).json({
        message: "User already exists, with this email",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

    const hashedPassword = await UserModel.hashPassword(password);

    const tempUser = await userServices.CreateTempUser({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    const info = await transporter.sendMail({
      from: '"EndVerse AI" <gMl5l@example.com>', // sender address
      to: email, // list of receivers
      subject: "Email Verification", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
    });

    res.status(201).json({
      message: "User created successfully Now verify your email",
      tempUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.verifyEmailUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp } = req.body;

  try {
    const user = await userServices.VerifyandCreateUser({ email, otp });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or OTP",
      });
    }

    const token = user.JWT_Token();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Email verified successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = user.JWT_Token();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
