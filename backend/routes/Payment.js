const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/Auth");

const paymentController = require("../controllers/Payment");


router.post("/payment/process", isAuthenticated, paymentController.processPayment)

router.get("/stripeAPI", isAuthenticated, paymentController.transferStripeAPI)

module.exports = router;
