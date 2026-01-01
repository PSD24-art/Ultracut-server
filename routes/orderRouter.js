// routes/auth.js
const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middleware/auth");
const { createOrder } = require("../controllers/orderController");

orderRouter.post("/new", authMiddleware, createOrder);

module.exports = orderRouter;
