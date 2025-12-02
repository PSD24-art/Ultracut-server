// routes/auth.js
const express = require("express");
const authRouter = express.Router();
const authCtrl = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
// POST /api/auth/send-otp
authRouter.post("/send-otp", authCtrl.sendOtp);

// POST /api/auth/verify-otp
authRouter.post("/verify-otp", authCtrl.verifyOtp);

// POST /api/auth/resend-otp
authRouter.post("/resend-otp", authCtrl.resendOtp);

// POST /api/auth/logout
authRouter.get("/logout", authCtrl.logout);

module.exports = authRouter;
