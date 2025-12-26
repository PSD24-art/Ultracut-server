// routes/auth.js
const express = require("express");
const userRouter = express.Router();
const authCtrl = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const userCtrl = require("../controllers/userController");

userRouter.post("/profile", authMiddleware, userCtrl.userProfile);
//complete profile
userRouter.post("/complete-profile", authMiddleware, userCtrl.completeProfile);
userRouter.post("/address", authMiddleware, userCtrl.addAddress);

module.exports = userRouter;
