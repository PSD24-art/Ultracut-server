const phonepeClient = require("./phonepe.client");

/**
 * Get PhonePe order status using merchantOrderId
 */
async function getPhonePeOrderStatus(merchantOrderId) {
  const response = await phonepeClient.getOrderStatus(merchantOrderId);

  return {
    state: response.state, // COMPLETED | FAILED | PENDING
    amount: response.amount,
    transactionId: response.transactionId,
    paymentInstrument: response.paymentInstrument,
    raw: response, // keep full response if needed
  };
}

module.exports = {
  getPhonePeOrderStatus,
};
