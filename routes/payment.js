// routes/payment.routes.js
const express = require("express");
const router = express.Router();

const { phonepeRedirect } = require("../controllers/phonepeRedirectController");
const { phonepeWebhook } = require("../controllers/phonepeWebhookController");

// router.post("/phonepe/redirect", phonepeRedirect);
router.get("/phonepe/redirect", phonepeRedirect);

// router.post("/phonepe/webhook", phonepeWebhook);
module.exports = router;
