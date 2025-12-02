// utils/smsSender.js
const axios = require("axios");

// For dev: returns the OTP so you can test easily.
// For prod: implement Twilio / MSG91 / Meta Cloud API logic here.
async function sendSms(phone, message, otp = null) {
  // If SMS_PROVIDER=dev return otp so frontend can show or use Postman.
  if (process.env.SMS_PROVIDER === "dev" || !process.env.SMS_PROVIDER) {
    console.log(`[DEV SMS] to ${phone}: ${message}`);
    return { success: true, otp };
  }

  // Example placeholder for Twilio or MSG91 integration.
  // Twilio example (you'll need to provide credentials in env):
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // use twilio SDK to send message.
  // For MSG91: call MSG91 REST API using axios and API key.

  // Return failure by default if not implemented
  return { success: false, error: "SMS provider not configured" };
}

module.exports = { sendSms };
