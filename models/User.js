// models/User.js
const mongoose = require("mongoose");
const addressSchema = require("./subschemas/Adress");
const { Schema } = mongoose;

// require("dotenv").config({ path: "../.env" });
// main()
//   .then(() => console.log("Databse Connected"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URI);
// }

const userSchema = new Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, sparse: true },
  createdAt: { type: Date, default: Date.now },

  orderHistory: [
    {
      itemName: String,
      itemCategory: String,
      itemSlug: String,
      itemPrice: Number,
      purchasedAt: { type: Date, default: Date.now },
    },
  ],

  addresses: [addressSchema],
  lastLoginAt: { type: Date },
  meta: { type: Schema.Types.Mixed },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
