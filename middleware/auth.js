// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "replace_me";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

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
