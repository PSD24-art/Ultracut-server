// const client = require("../services/phonepe.client");
// const Order = require("../models/Orders");

// exports.phonepeWebhook = async (req, res) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const rawBody = req.body.toString("utf8");

//     const callbackResponse = client.validateCallback(
//       process.env.PHONEPE_MERCHANT_USERNAME,
//       process.env.PHONEPE_MERCHANT_PASSWORD,
//       authHeader,
//       rawBody
//     );

//     const { orderId, state } = callbackResponse.payload;

//     const order = await Order.findById(orderId);
//     if (!order) return res.status(200).send("OK");

//     if (state === "COMPLETED") {
//       order.paymentStatus = "success";
//       order.status = "processing";
//     } else if (state === "FAILED") {
//       order.paymentStatus = "failed";
//     }

//     await order.save();
//     return res.status(200).send("OK");
//   } catch (err) {
//     console.error("PHONEPE WEBHOOK ERROR:", err.message);
//     return res.status(200).send("OK");
//   }
// };
