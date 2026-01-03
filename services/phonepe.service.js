const { MetaInfo, CreateSdkOrderRequest } = require("pg-sdk-node");

const phonepeClient = require("./phonepe.client");

async function createPhonePePayment({ orderId, amount, redirectUrl }) {
  // 🔑 PhonePe requires amount in PAISA
  const amountInPaise = amount * 100;

  // MetaInfo (optional but recommended)
  const metaInfo = MetaInfo.builder().udf1("ultracut").udf2("checkout").build();

  // Build request using SDK builder
  const orderRequest = CreateSdkOrderRequest.StandardCheckoutBuilder()
    .merchantOrderId(orderId) // <= 63 chars, unique
    .amount(amountInPaise)
    .metaInfo(metaInfo)
    .redirectUrl(redirectUrl)
    .expireAfter(900) // 15 minutes
    .message("Complete payment to confirm order")
    .build();

  // Call PhonePe
  const response = await phonepeClient.pay(orderRequest);

  // PhonePe hosted payment UI
  return response.redirectUrl;
}

module.exports = {
  createPhonePePayment,
};
