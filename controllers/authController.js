// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/OTP");
// const { sendSms } = require("../utils/smsSender");

const OTP_EXPIRES_MINUTES = parseInt(
  process.env.OTP_EXPIRES_MINUTES || "10",
  10
);
const JWT_SECRET = process.env.JWT_SECRET || "replace_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);

    // Upsert OTP document (delete old if any)
    await Otp.findOneAndDelete({ phone });
    await Otp.create({ phone, otpHash, expiresAt });

    // // Send OTP via SMS (dev returns otp)
    // const smsRes = await sendSms(phone, `Your OTP is ${otp}`, otp);

    // For dev/testing, respond with OTP; in prod do NOT send otp in response
    return res.json({
      otp: otp, //Temporary
      success: true,
      message: "OTP sent",
      // dev: smsRes, // contains otp in dev mode
    });
  } catch (err) {
    console.error("sendOtpErr", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return res.status(400).json({ message: "Phone & OTP required" });

    const otpDoc = await Otp.findOne({ phone });
    if (!otpDoc)
      return res.status(400).json({ message: "OTP not found or expired" });

    if (new Date() > otpDoc.expiresAt) {
      await Otp.deleteOne({ phone });
      return res.status(400).json({ message: "OTP expired" });
    }

    const match = await bcrypt.compare(otp, otpDoc.otpHash);
    if (!match) {
      otpDoc.attempts = (otpDoc.attempts || 0) + 1;
      await otpDoc.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP matches
    let user = await User.findOne({ phone });

    let isNewUser = false;
    if (!user) {
      user = await User.create({
        phone,
        lastLoginAt: new Date(),
        profileCompleted: false, // important for your new flow
      });
      isNewUser = true;
    } else {
      user.lastLoginAt = new Date();
      await user.save();
    }

    // Delete OTP document
    await Otp.deleteOne({ phone });

    // Create JWT
    const token = signJwt({ id: user._id, phone: user.phone });
    const isProd = process.env.NODE_ENV === "production";

    const cookieOpts = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };

    res.cookie("token", token, cookieOpts);

    return res.json({
      success: true,
      new: isNewUser,
      profileCompleted: user.profileCompleted,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("verifyOtpErr", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });
    // Rate limiting logic: you should check last OTP time and restrict frequent resends
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);
    await Otp.findOneAndDelete({ phone });
    await Otp.create({ phone, otpHash, expiresAt });
    // const smsRes = await sendSms(phone, `Your OTP is ${otp}`, otp);
    return res.json({ success: true, message: "OTP resent", dev: smsRes });
  } catch (err) {
    console.error("resendOtpErr", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, message: "Logged out" });
};

//CtrZ to bring back LOGINMODAL
