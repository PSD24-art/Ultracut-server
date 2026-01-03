// models/Order.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
// require("dotenv").config({
//   path: require("path").resolve(__dirname, "../.env"),
// });

// const DB_URI = process.env.MONGO_URI;
// mongoose
//   .connect(DB_URI)
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.error("DB Connection Error:", err));

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

const Orders = mongoose.model("Order", orderSchema);
module.exports = Orders;

async function deleteOrders() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("❌ deleteOrders is blocked in production");
  }

  try {
    const result = await Orders.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} orders`);
  } catch (error) {
    console.error("❌ Failed to delete orders:", error.message);
  }
}

// deleteOrders();
