// models/Order.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Item", required: false }, // optional if you store productId
  title: String,
  sku: String,
  price: Number,
  qty: { type: Number, default: 1 },
  image: String,
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true },
  items: [orderItemSchema],
  subtotal: Number,
  shipping: { type: Number, default: 100 },
  total: Number,
  paymentMethod: { type: String },
  paymentStatus: { type: String, default: "pending" },
  paymentMeta: Schema.Types.Mixed,
  shippingAddress: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "created" }, // created, processing, shipped, delivered, cancelled
});

module.exports = mongoose.model("Order", orderSchema);
