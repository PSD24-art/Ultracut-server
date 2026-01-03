// routes/auth.js
const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createOrder,
  getOrderById,
  retryPayment,
  getMyOrders,
} = require("../controllers/orderController");

orderRouter.post("/:id/retry-payment", authMiddleware, retryPayment);
orderRouter.post("/new", authMiddleware, createOrder);
orderRouter.get("/my", authMiddleware, getMyOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);

module.exports = orderRouter;
