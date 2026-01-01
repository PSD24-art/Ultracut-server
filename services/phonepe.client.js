const { StandardCheckoutClient, Env } = require("pg-sdk-node");

const clientId = process.env.PHONEPE_CLIENT_ID;
const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
const clientVersion = 1;
const env = Env.SANDBOX;

const phonepeClient = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

module.exports = phonepeClient;
