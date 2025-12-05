// models/Consumable.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// async function main() {
//   await mongoose.connect(process.env.MONGO_URI);
// }
// require("dotenv").config({ path: "../.env" });
// main()
//   .then(() => console.log("Databse Connected"))
//   .catch((err) => console.log(err));

const ConsumableSchema = new Schema({
  title: { type: String, required: true, trim: true },
  brand: { type: String },
  slug: { type: String, required: true, trim: true, index: true },
  image: { type: String, default: "" }, // primary image URL
  images: [String], // optional gallery
  short: { type: String, default: "" }, // short intro/teaser
  description: { type: String, default: "" }, // HTML allowed
  price: { type: Number, default: 0 },
  mrp: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  meta: Schema.Types.Mixed, // any SEO/meta fields
  specs: Schema.Types.Mixed, // key-value specs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// update updatedAt on save
ConsumableSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Consumables = mongoose.model("Consumable", ConsumableSchema);
module.exports = Consumables;

const consumables = [
  {
    id: 1,
    title: "Laser Source for Fiber Laser Machine",
    slug: "laser-source",
    categorySlug: "laser-source",
    image: "/images/consumables/laser-source.webp",
    short: "High-performance laser source for fiber laser cutting machines.",
    description: `
      <p>
        Our <strong>fiber laser sources</strong> deliver maximum performance, 
        long service life, and stable beam quality for industrial metal cutting applications.
      </p>
      <p>
        Suitable for all major machines, available in multiple power configurations.
      </p>
    `,
    specs: {
      brand: "Nova Laser",
      type: "Fiber Laser Source",
      powerOptions: "1kW – 6kW",
      warranty: "24 Months",
    },
    mrp: 185000,
    price: 175000,
    stock: 10,
  },

  {
    id: 2,
    title: "Cutting Head - Nova Laser",
    slug: "cutting-head",
    categorySlug: "cutting-head",
    image: "/images/consumables/cutting-head.webp",
    short: "Durable cutting head designed for precision fiber laser cutting.",
    description: `
      <p>
        Nova Laser cutting heads are engineered for accuracy, durability, and 
        high-speed industrial cutting applications.
      </p>
      <p>
        Compatible with major fiber laser sources and supported nationwide.
      </p>
    `,
    specs: {
      brand: "Nova Laser",
      focus: "Auto / Manual",
      cooling: "Water-cooled",
    },
    mrp: 125000,
    price: 115000,
    stock: 15,
  },

  {
    id: 3,
    title: "RayTools Laser Cutting Head",
    slug: "raytools-cutting-head",
    categorySlug: "raytools-cutting-head",
    image: "/images/consumables/raytools-head.webp",
    short:
      "Original RayTools cutting head — reliable, high-precision performance.",
    description: `
      <p>
        Buy <strong>RayTools BM111/BM110 cutting heads</strong> sourced directly 
        from RayTools China — 100% genuine, industrial-grade components.
      </p>
      <p>
        Perfect for sheet metal, stainless steel, mild steel, and aluminum cutting.
      </p>
    `,
    specs: {
      brand: "RayTools",
      model: "BM111 / BM110",
      focus: "Auto Focus",
      warranty: "12 Months",
    },
    mrp: 125000,
    price: 115000,
    stock: 5,
  },

  {
    id: 4,
    title: "WSX Laser Cutting Head",
    slug: "wsx-laser-cutting-head",
    categorySlug: "wsx-laser-cutting-head",
    image: "/images/consumables/wsx-head.webp",
    short: "High-speed WSX laser head for premium cutting output.",
    description: `
      <p>
        WSX laser heads offer <strong>stable cutting performance</strong> even in 
        continuous heavy-duty industrial operations.
      </p>
    `,
    specs: {
      brand: "WSX",
      compatibility: "All major fiber laser machines",
    },
    mrp: 98000,
    price: 92000,
    stock: 8,
  },

  {
    id: 5,
    title: "Protective Lens",
    slug: "protective-lens",
    categorySlug: "protective-lens",
    image: "/images/consumables/protective-lens.webp",
    short: "High-quality protection lens for fiber laser cutting heads.",
    description: `
      <p>
        Protective lenses safeguard the cutting head from dust, smoke, and metal splash, ensuring longer tool life.
      </p>
    `,
    specs: {
      diameter: "27.9mm / 24.9mm / 20mm",
      coating: "Double-sided AR",
    },
    mrp: 1200,
    price: 900,
    stock: 200,
  },

  {
    id: 6,
    title: "Cutting Nozzle",
    slug: "cutting-nozzle",
    categorySlug: "cutting-nozzle",
    image: "/images/consumables/cutting-nozzle.webp",
    short: "Premium nozzles for clean and precise laser cutting.",
    description: `
      <p>
        Available in single and double layer, suitable for oxygen and nitrogen cutting.
      </p>
    `,
    specs: {
      type: "Single / Double Layer",
      material: "Copper",
    },
    mrp: 200,
    price: 120,
    stock: 500,
  },

  {
    id: 7,
    title: "Ceramic Ring",
    slug: "ceramic-ring",
    categorySlug: "ceramic-ring",
    image: "/images/consumables/ceramic-ring.webp",
    short: "High-insulation ceramic ring for laser heads.",
    description: `
      <p>
        Durable ceramic adapters used for isolating the nozzle from the laser cutting head.
      </p>
    `,
    specs: {
      material: "Industrial Ceramic",
      compatibility: "RayTools / WSX / Others",
    },
    mrp: 450,
    price: 350,
    stock: 120,
  },

  {
    id: 8,
    title: "Focusing & Collimating Lens",
    slug: "focusing-collimating-lens",
    categorySlug: "focusing-collimating-lens",
    image: "/images/consumables/focus-collimation.webp",
    short: "High-precision lenses for beam focusing & collimation.",
    description: `
      <p>
        Manufactured using Japan-imported optics material for maximum durability and clarity.
      </p>
    `,
    specs: {
      coating: "AR Coating",
      material: "Fused Silica",
    },
    mrp: 6500,
    price: 5800,
    stock: 60,
  },

  {
    id: 9,
    title: "QBH Protective Cap",
    slug: "qbh-protective-cap",
    categorySlug: "qbh-protective-cap",
    image: "/images/consumables/qbh-cap.webp",
    short: "Protective cap for QBH fiber laser connectors.",
    description: `
      <p>
        Prevents dust and metal contaminants from entering the QBH connector during machine idle time.
      </p>
    `,
    specs: {
      material: "Stainless Steel + Insulation Layer",
    },
    mrp: 300,
    price: 220,
    stock: 70,
  },

  {
    id: 10,
    title: "SMC Valve / Solenoid Valve",
    slug: "smc-valve",
    categorySlug: "smc-valve",
    image: "/images/consumables/smc-valve.webp",
    short: "Original SMC solenoid valve for laser cutting machines.",
    description: `
      <p>
        Ensures stable gas flow control and supports high-speed laser cutting operations.
      </p>
    `,
    specs: {
      brand: "SMC Japan",
      type: "Solenoid Valve",
    },
    mrp: 2800,
    price: 2600,
    stock: 40,
  },

  {
    id: 11,
    title: "Control Card",
    slug: "control-card",
    categorySlug: "control-card",
    image: "/images/consumables/control-card.webp",
    short: "Control card for CNC laser systems.",
    description: `
      <p>
        Supports stable motion control with multiple communication modes.
      </p>
    `,
    specs: {
      communication: "Ethernet / USB",
      compatibility: "CNC & Laser Controllers",
    },
    mrp: 15000,
    price: 13500,
    stock: 12,
  },

  {
    id: 12,
    title: "RF Cable",
    slug: "rf-cable",
    categorySlug: "rf-cable",
    image: "/images/consumables/rf-cable.webp",
    short: "High-frequency RF cable for CNC and laser systems.",
    description: `
      <p>
        Ensures stable signal transmission even in high-frequency environments.
      </p>
    `,
    specs: {
      length: "1m – 3m",
      shielding: "Double-layer",
    },
    mrp: 900,
    price: 750,
    stock: 80,
  },

  {
    id: 13,
    title: "Laser Cutting Remote Controller",
    slug: "remote-controller",
    categorySlug: "remote-controller",
    image: "/images/consumables/remote-controller.webp",
    short: "Wireless remote controller for laser cutting machines.",
    description: `
      <p>
        Improves operator convenience with fast response time and stable wireless connectivity.
      </p>
    `,
    specs: {
      wireless: "2.4GHz",
      range: "10–15 meters",
    },
    mrp: 3500,
    price: 3200,
    stock: 25,
  },

  {
    id: 14,
    title: "DNE Consumables",
    slug: "dne-consumables",
    categorySlug: "dne-consumables",
    image: "/images/consumables/dne.webp",
    short: "Original DNE fiber laser machine consumables.",
    description: `
      <p>
        All essential spares and replacement parts for DNE machines.
      </p>
    `,
    specs: {
      brand: "DNE",
      usage: "Fiber Laser Machines",
    },
    mrp: 3500,
    price: 3300,
    stock: 20,
  },

  {
    id: 15,
    title: "Sensor Parts",
    slug: "sensor-parts",
    categorySlug: "sensor-parts",
    image: "/images/consumables/sensor.webp",
    short: "Industrial-grade sensor components for laser systems.",
    description: `
      <p>
        Ensures accurate height sensing and precise automatic focusing.
      </p>
    `,
    specs: {
      type: "Height Sensor Components",
    },
    mrp: 1200,
    price: 950,
    stock: 100,
  },

  {
    id: 16,
    title: "Cleaning Consumables",
    slug: "cleaning-consumables",
    categorySlug: "cleaning-consumables",
    image: "/images/consumables/cleaning-consumables.webp",
    short: "Cleaning tools & solutions for fiber laser maintenance.",
    description: `
      <p>
        Extend the life of your laser machine with premium-grade cleaning products.
      </p>
    `,
    specs: {
      itemsIncluded: "Nozzle Cleaner, Air Gun, Wipes",
    },
    mrp: 800,
    price: 650,
    stock: 150,
  },
];
// const feedConsumables = async (consumables) => {
//   let feedConsumables = await Consumables.insertMany(consumables);
//   console.log(consumables.length);
// };

// feedConsumables(consumables);
