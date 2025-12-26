// server.js (or app.js)
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const authMiddleware = require("./middleware/auth");
const Product = require("./models/Products");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ultracut-client.onrender.com"],
    credentials: true,
  })
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

app.get("/api/products", async (req, res) => {
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
  console.log(`Server is running on http://localhost:${PORT}`)
);
