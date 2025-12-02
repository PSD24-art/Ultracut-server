// models/product.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  sku: String,
  title: String,
  slug: { type: String, index: true },
  brand: String,
  head: String,
  category: String,
  price: Number,
  mrp: Number,
  stock: Number,
  images: [String],
  short: String,
  description: String,
  specs: Schema.Types.Mixed,
  meta: Schema.Types.Mixed,
  //   createdAt: { type: Date, default: Date.now },
});

productSchema.index({ title: "text", category: 1, slug: 1 }); // basic index

module.exports = mongoose.model("Product", productSchema);
