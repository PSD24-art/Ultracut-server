const Order = require("../models/Orders");
const { getPhonePeOrderStatus } = require("../services/phonepe.status.service");

exports.phonepeRedirect = async (req, res) => {
  try {
    // ✅ READ FROM QUERY (because we set it)
    const merchantOrderId = req.query.orderId;

    if (!merchantOrderId) {
      return res.status(400).send("Missing orderId in redirect");
    }

    // 🔑 VERIFY WITH PHONEPE (source of truth)
    const status = await getPhonePeOrderStatus(merchantOrderId);

    const order = await Order.findById(merchantOrderId);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    if (status.state === "COMPLETED") {
      order.paymentStatus = "success";

      if (order.paymentMethod === "COD") {
        order.paymentMeta.codAdvancePaid = true;
      }

      await order.save();

      return res.redirect(
        `${process.env.FRONTEND_URL}/order-success/${order._id}`
      );
    }

    if (status.state === "FAILED") {
      order.paymentStatus = "failed";
      await order.save();

      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failed/${order._id}`
      );
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-pending/${order._id}`
    );
  } catch (err) {
    console.error("PHONEPE REDIRECT ERROR:", err);
    res.status(500).send("Payment verification failed");
  }
};
