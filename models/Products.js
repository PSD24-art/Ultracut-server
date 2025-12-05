// models/product.js
const mongoose = require("mongoose");
const { products } = require("../rawProducts");
const { Schema } = mongoose;

// require("dotenv").config({ path: "../.env" });
// main()
//   .then(() => console.log("Databse Connected"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URI);
// }

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
  //createdAt: { type: Date, default: Date.now },
});

productSchema.index({ title: "text", category: 1, slug: 1 }); // basic index

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// async function feedItems(items) {
//   try {
//     let addItems = await Product.insertMany(items);
//     console.log("added items", addItems.length);
//   } catch (e) {
//     console.log(e);
//   }
// }

// const productsArray = [
//   {
//     sku: "CON-001",
//     title: "Laser Source for Fiber Laser Machine",
//     slug: "laser-source",
//     head: "Nova Laser LS1000 Head",
//     brand: "Nova Laser",
//     category: "laser-source",
//     price: 175000,
//     mrp: 185000,
//     stock: 10,
//     images: ["/images/consumables/laser-source.webp"],
//     short: "High-performance laser source for fiber laser cutting machines.",
//     description: `...`,
//     specs: {
//       brand: "Nova Laser",
//       type: "Fiber Laser Source",
//       powerOptions: "1kW – 6kW",
//       warranty: "24 Months",
//     },
//     meta: {},
//   },

//   {
//     sku: "CON-002",
//     title: "Cutting Head - Nova Laser",
//     slug: "cutting-head",
//     head: "Nova Laser NL-110 Head",
//     brand: "Nova Laser",
//     category: "cutting-head",
//     price: 115000,
//     mrp: 125000,
//     stock: 15,
//     images: ["/images/consumables/cutting-head.webp"],
//     short: "Durable cutting head designed for precision fiber laser cutting.",
//     description: `...`,
//     specs: {
//       brand: "Nova Laser",
//       focus: "Auto / Manual",
//       cooling: "Water-cooled",
//     },
//     meta: {},
//   },

//   {
//     sku: "CON-003",
//     title: "RayTools Laser Cutting Head",
//     slug: "raytools-cutting-head",
//     head: "RayTools BM111/BM110 Head",
//     brand: "RayTools",
//     category: "raytools-cutting-head",
//     price: 115000,
//     mrp: 125000,
//     stock: 5,
//     images: ["/images/consumables/raytools-head.webp"],
//     short:
//       "Original RayTools cutting head — reliable, high-precision performance.",
//     description: `...`,
//     specs: {
//       brand: "RayTools",
//       model: "BM111 / BM110",
//       focus: "Auto Focus",
//       warranty: "12 Months",
//     },
//     meta: {},
//   },

//   {
//     sku: "CON-004",
//     title: "WSX Laser Cutting Head",
//     slug: "wsx-laser-cutting-head",
//     head: "WSX WSX-200 Head",
//     brand: "WSX",
//     category: "wsx-laser-cutting-head",
//     price: 92000,
//     mrp: 98000,
//     stock: 8,
//     images: ["/images/consumables/wsx-head.webp"],
//     short: "High-speed WSX laser head for premium cutting output.",
//     description: `...`,
//     specs: { brand: "WSX", compatibility: "All major fiber laser machines" },
//     meta: {},
//   },

//   {
//     sku: "CON-005",
//     title: "Protective Lens",
//     slug: "protective-lens",
//     head: "Protective Lens STD Head",
//     brand: "Generic / Nova Laser",
//     category: "protective-lens",
//     price: 900,
//     mrp: 1200,
//     stock: 200,
//     images: ["/images/consumables/protective-lens.webp"],
//     short: "High-quality protection lens for fiber laser cutting heads.",
//     description: `...`,
//     specs: { diameter: "27.9mm / 24.9mm / 20mm", coating: "Double-sided AR" },
//     meta: {},
//   },

//   {
//     sku: "CON-006",
//     title: "Cutting Nozzle",
//     slug: "cutting-nozzle",
//     head: "Nozzle STD-1 Head",
//     brand: "Generic",
//     category: "cutting-nozzle",
//     price: 120,
//     mrp: 200,
//     stock: 500,
//     images: ["/images/consumables/cutting-nozzle.webp"],
//     short: "Premium nozzles for clean and precise laser cutting.",
//     description: `...`,
//     specs: { type: "Single / Double Layer", material: "Copper" },
//     meta: {},
//   },

//   {
//     sku: "CON-007",
//     title: "Ceramic Ring",
//     slug: "ceramic-ring",
//     head: "Ceramic Ring STD Head",
//     brand: "Generic",
//     category: "ceramic-ring",
//     price: 350,
//     mrp: 450,
//     stock: 120,
//     images: ["/images/consumables/ceramic-ring.webp"],
//     short: "High-insulation ceramic ring for laser heads.",
//     description: `...`,
//     specs: {
//       material: "Industrial Ceramic",
//       compatibility: "RayTools / WSX / Others",
//     },
//     meta: {},
//   },

//   {
//     sku: "CON-008",
//     title: "Focusing & Collimating Lens",
//     slug: "focusing-collimating-lens",
//     head: "Optics COL-100 Head",
//     brand: "Optics (Japan-imported)",
//     category: "focusing-collimating-lens",
//     price: 5800,
//     mrp: 6500,
//     stock: 60,
//     images: ["/images/consumables/focus-collimation.webp"],
//     short: "High-precision lenses for beam focusing & collimation.",
//     description: `...`,
//     specs: { coating: "AR Coating", material: "Fused Silica" },
//     meta: {},
//   },

//   {
//     sku: "CON-009",
//     title: "QBH Protective Cap",
//     slug: "qbh-protective-cap",
//     head: "QBH Cap STD Head",
//     brand: "Generic",
//     category: "qbh-protective-cap",
//     price: 220,
//     mrp: 300,
//     stock: 70,
//     images: ["/images/consumables/qbh-cap.webp"],
//     short: "Protective cap for QBH fiber laser connectors.",
//     description: `...`,
//     specs: { material: "Stainless Steel + Insulation Layer" },
//     meta: {},
//   },

//   {
//     sku: "CON-010",
//     title: "SMC Valve / Solenoid Valve",
//     slug: "smc-valve",
//     head: "SMC SVM-100 Head",
//     brand: "SMC Japan",
//     category: "smc-valve",
//     price: 2600,
//     mrp: 2800,
//     stock: 40,
//     images: ["/images/consumables/smc-valve.webp"],
//     short: "Original SMC solenoid valve for laser cutting machines.",
//     description: `...`,
//     specs: { brand: "SMC Japan", type: "Solenoid Valve" },
//     meta: {},
//   },

//   {
//     sku: "CON-011",
//     title: "Control Card",
//     slug: "control-card",
//     head: "Control Card CC-100 Head",
//     brand: "Generic",
//     category: "control-card",
//     price: 13500,
//     mrp: 15000,
//     stock: 12,
//     images: ["/images/consumables/control-card.webp"],
//     short: "Control card for CNC laser systems.",
//     description: `...`,
//     specs: {
//       communication: "Ethernet / USB",
//       compatibility: "CNC & Laser Controllers",
//     },
//     meta: {},
//   },

//   {
//     sku: "CON-012",
//     title: "RF Cable",
//     slug: "rf-cable",
//     head: "RF Cable RC-1 Head",
//     brand: "Generic",
//     category: "rf-cable",
//     price: 750,
//     mrp: 900,
//     stock: 80,
//     images: ["/images/consumables/rf-cable.webp"],
//     short: "High-frequency RF cable for CNC and laser systems.",
//     description: `...`,
//     specs: { length: "1m – 3m", shielding: "Double-layer" },
//     meta: {},
//   },

//   {
//     sku: "CON-013",
//     title: "Laser Cutting Remote Controller",
//     slug: "remote-controller",
//     head: "Remote Controller RC-2 Head",
//     brand: "Generic",
//     category: "remote-controller",
//     price: 3200,
//     mrp: 3500,
//     stock: 25,
//     images: ["/images/consumables/remote-controller.webp"],
//     short: "Wireless remote controller for laser cutting machines.",
//     description: `...`,
//     specs: { wireless: "2.4GHz", range: "10–15 meters" },
//     meta: {},
//   },

//   {
//     sku: "CON-014",
//     title: "DNE Consumables",
//     slug: "dne-consumables",
//     head: "DNE STD Head",
//     brand: "DNE",
//     category: "dne-consumables",
//     price: 3300,
//     mrp: 3500,
//     stock: 20,
//     images: ["/images/consumables/dne.webp"],
//     short: "Original DNE fiber laser machine consumables.",
//     description: `...`,
//     specs: { brand: "DNE", usage: "Fiber Laser Machines" },
//     meta: {},
//   },

//   {
//     sku: "CON-015",
//     title: "Sensor Parts",
//     slug: "sensor-parts",
//     head: "Sensor SP-10 Head",
//     brand: "Generic",
//     category: "sensor-parts",
//     price: 950,
//     mrp: 1200,
//     stock: 100,
//     images: ["/images/consumables/sensor.webp"],
//     short: "Industrial-grade sensor components for laser systems.",
//     description: `...`,
//     specs: { type: "Height Sensor Components" },
//     meta: {},
//   },

//   {
//     sku: "CON-016",
//     title: "Cleaning Consumables",
//     slug: "cleaning-consumables",
//     head: "Cleaning Kit CK-1 Head",
//     brand: "Generic",
//     category: "cleaning-consumables",
//     price: 650,
//     mrp: 800,
//     stock: 150,
//     images: ["/images/consumables/cleaning-consumables.webp"],
//     short: "Cleaning tools & solutions for fiber laser maintenance.",
//     description: `...`,
//     specs: { itemsIncluded: "Nozzle Cleaner, Air Gun, Wipes" },
//     meta: {},
//   },
// ];

// feedItems(productsArray);
