// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "replace_me";

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) return res.status(401).json({ message: "Unauthenticated" });
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("-__v");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error("auth error", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// exports.authLight = (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) return res.status(401).json({ message: "Unauthenticated" });

//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload; // trusted token payload
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

module.exports = authMiddleware;
