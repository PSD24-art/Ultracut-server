const Order = require("../models/Orders");
const PRODUCTS = require("../data/Products");
const { createPhonePePayment } = require("../services/phonepe.service");

exports.createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !items?.length) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const paymentMethod = items[0].paymentMethod; // "COD" or "ONLINE"

    let subtotal = 0;
    const orderItems = [];

    for (const it of items) {
      const product = PRODUCTS.find(
        (p) => p._id === it.id || p.slug === it.id || p.sku === it.id
      );

      if (!product) {
        return res.status(400).json({
          message: `Product not found: ${it.id}`,
        });
      }

      const qty = it.qty || 1;
      subtotal += product.price * qty;

      orderItems.push({
        title: product.title,
        sku: product.sku,
        price: product.price,
        qty,
        image: product.image,
      });
    }

    const SHIPPING = 100;
    const total = subtotal + SHIPPING;

    // 💰 Decide payable amount
    let payableAmount = total;
    if (paymentMethod === "COD") {
      payableAmount = 250; // COD advance
    }

    // 1️⃣ Create DB order
    const order = await Order.create({
      user: req.user._id,
      phone: customer.phone,
      items: orderItems,
      subtotal,
      shipping: SHIPPING,
      total,
      paymentMethod,
      paymentStatus: "initiated",
      paymentMeta: { payableAmount },
      shippingAddress: customer.address,
      status: "created",
    });

    // 2️⃣ Create PhonePe checkout
    const redirectUrl = await createPhonePePayment({
      orderId: order._id.toString(), // <= 63 chars
      amount: payableAmount,
      redirectUrl: `${process.env.BASE_URL}/payment/phonepe/redirect?orderId=${order._id}`,
    });

    // 3️⃣ Send PhonePe payment page
    res.json({
      success: true,
      redirectUrl,
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Payment initiation failed",
    });
  }
};
