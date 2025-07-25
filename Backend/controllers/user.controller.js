const userServices = require("../services/user.service");
const TempUserModel = require("../models/tempUser.model");
const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const transporter = require("../services/Sendmail.service");


module.exports.StartServer = async (req, res) => {
  try {
    res.status(200).json({
      message: "Server started successfully 🚀🚀",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

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
      from: `"EndVerse AI" <${process.env.SENDERS_MAIL}>`,
      to: email,
      subject: "🔐 Your EndVerse AI Verification Code",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a1f3a; color: #e6e6e6; border-radius: 8px; overflow: hidden; border: 1px solid #1a3a6a;">
      <div style="background: linear-gradient(135deg, #1a3a6a, #0a1f3a); padding: 25px; text-align: center; border-bottom: 1px solid #2a4a7a;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">EndVerse AI Verification</h1>
        <p style="margin: 5px 0 0; font-size: 12px; color: #a0b8d8; letter-spacing: 1px;">POWERED BY ENDGAMING AI</p>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #4d9fff; margin-top: 0; font-size: 20px;">Verify Your Email Address</h2>
        <p style="line-height: 1.6;">Thank you for using EndVerse AI. To complete your verification, please enter the following One-Time Password (OTP):</p>
        
        <div style="background-color: #122b4a; border-left: 4px solid #4d9fff; padding: 20px; margin: 25px 0; border-radius: 4px; text-align: center;">
          <p style="margin: 0 0 10px; font-size: 14px; color: #a0b8d8;">Your verification code for ${email}:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ffffff; margin: 15px 0; background-color: #1a3a6a; padding: 10px; border-radius: 4px; display: inline-block; min-width: 200px;">${otp}</div>
          <p style="margin: 10px 0 0; font-size: 13px; color: #a0b8d8;">Valid for 10 minutes</p>
        </div>
        
        <p style="font-size: 14px; color: #a0b8d8; line-height: 1.6;">If you didn't request this code, please ignore this email or contact our support team immediately.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1a3a6a;">
          <p style="margin-bottom: 8px; color: #a0b8d8;">Need assistance?</p>
          <a href="mailto:support@endverse.ai" style="color: #4d9fff; text-decoration: none; font-weight: 500;">support@endverse.ai</a>
          <p style="margin-top: 15px; font-size: 12px; color: #a0b8d8;">Or visit: <a href="https://endverse.ai" style="color: #4d9fff; text-decoration: none;">endverse.ai</a></p>
        </div>
      </div>
      
      <div style="background-color: #122b4a; padding: 15px; text-align: center; font-size: 12px; color: #a0b8d8; border-top: 1px solid #1a3a6a;">
        © ${new Date().getFullYear()} EndVerse AI. All rights reserved.<br>
        <span style="font-size: 11px; opacity: 0.8;">Powered by EndGaming AI Technology</span>
      </div>
    </div>
  `,
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // or "Lax"
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // or "Lax"
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

module.exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const isUser = await TempUserModel.findOne({ email });

    if (!isUser) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    const info = await transporter.sendMail({
      from: process.env.SENDERS_MAIL, // Sender address
      to: email,
      subject: "🔐 Your EndVerse AI Verification Code",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a1f3a; color: #e6e6e6; border-radius: 8px; overflow: hidden; border: 1px solid #1a3a6a;">
      <div style="background: linear-gradient(135deg, #1a3a6a, #0a1f3a); padding: 25px; text-align: center; border-bottom: 1px solid #2a4a7a;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">EndVerse AI Verification</h1>
        <p style="margin: 5px 0 0; font-size: 12px; color: #a0b8d8; letter-spacing: 1px;">POWERED BY ENDGAMING AI</p>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #4d9fff; margin-top: 0; font-size: 20px;">Verify Your Email Address</h2>
        <p style="line-height: 1.6;">Thank you for using EndVerse AI. To complete your verification, please enter the following One-Time Password (OTP):</p>
        
        <div style="background-color: #122b4a; border-left: 4px solid #4d9fff; padding: 20px; margin: 25px 0; border-radius: 4px; text-align: center;">
          <p style="margin: 0 0 10px; font-size: 14px; color: #a0b8d8;">Your verification code for ${email}:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ffffff; margin: 15px 0; background-color: #1a3a6a; padding: 10px; border-radius: 4px; display: inline-block; min-width: 200px;">${otp}</div>
          <p style="margin: 10px 0 0; font-size: 13px; color: #a0b8d8;">Valid for 10 minutes</p>
        </div>
        
        <p style="font-size: 14px; color: #a0b8d8; line-height: 1.6;">If you didn't request this code, please ignore this email or contact our support team immediately.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1a3a6a;">
          <p style="margin-bottom: 8px; color: #a0b8d8;">Need assistance?</p>
          <a href="mailto:support@endverse.ai" style="color: #4d9fff; text-decoration: none; font-weight: 500;">support@endverse.ai</a>
          <p style="margin-top: 15px; font-size: 12px; color: #a0b8d8;">Or visit: <a href="https://endverse.ai" style="color: #4d9fff; text-decoration: none;">endverse.ai</a></p>
        </div>
      </div>
      
      <div style="background-color: #122b4a; padding: 15px; text-align: center; font-size: 12px; color: #a0b8d8; border-top: 1px solid #1a3a6a;">
        © ${new Date().getFullYear()} EndVerse AI. All rights reserved.<br>
        <span style="font-size: 11px; opacity: 0.8;">Powered by EndGaming AI Technology</span>
      </div>
    </div>
  `,
    });

    const newOtp = await TempUserModel.findOneAndUpdate(
      { email },
      {
        otp: otp,
        otpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      msg: "OTP sent successfully",
      newOtp,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
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
};
