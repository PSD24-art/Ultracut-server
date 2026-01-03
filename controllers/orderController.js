const Order = require("../models/Orders");
const PRODUCTS = require("../data/products");
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

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      order: {
        id: order._id,
        status: order.status,
        paymentStatus: order.paymentStatus,
        total: order.total,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        items: order.items,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

exports.retryPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Block retry ONLY if already successful
    if (order.paymentStatus === "success") {
      return res.status(400).json({
        success: false,
        message: "Payment already successful. Retry not allowed.",
      });
    }

    const payableAmount =
      order.paymentMethod === "COD"
        ? order.paymentMeta?.payableAmount
        : order.total;

    if (!payableAmount || payableAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payable amount",
      });
    }

    const redirectUrl = await createPhonePePayment({
      orderId: order._id.toString(),
      amount: payableAmount,
      redirectUrl: `${process.env.BASE_URL}/payment/phonepe/redirect?orderId=${order._id}`,
    });

    order.paymentStatus = "initiated";
    await order.save();

    res.json({
      success: true,
      redirectUrl,
    });
  } catch (err) {
    console.error("RETRY PAYMENT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Retry payment failed",
      error: err.message,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 }) // latest first
      .select("_id status paymentStatus total paymentMethod createdAt items");

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("GET MY ORDERS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
