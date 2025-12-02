// models/subschemas/Address.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    label: { type: String, default: "Home" }, // Home, Work, Other
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    landmark: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
); // keep _id for editing/deleting single address

module.exports = addressSchema;
