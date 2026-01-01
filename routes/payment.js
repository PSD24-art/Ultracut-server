// routes/payment.routes.js
const express = require("express");
const router = express.Router();

const { phonepeRedirect } = require("../controllers/phonepeRedirectController");

// router.post("/phonepe/redirect", phonepeRedirect);
router.get("/phonepe/redirect", phonepeRedirect);

module.exports = router;
