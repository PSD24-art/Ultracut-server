// server.js (or app.js)
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const authMiddleware = require("./middleware/auth");
const Product = require("./models/Products");
const orderRouter = require("./routes/orderRouter");
const paymentRouter = require("./routes/payment");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ultracut-client.onrender.com"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Mongo conncection
const DB_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(DB_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/payment", paymentRouter);
app.get("/api/test", (req, res) => {
  res.json({ message: "Test working success" });
});
app.get("/api/products", async (req, res) => {
  // console.log(typeof Product);
  const allProducts = await Product.find();
  if (allProducts.length > 1) {
    res.json({ products: allProducts });
  } else {
    res.json({ message: "No products found" });
  }
});

// /me route
app.get("/api/user/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
