const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = CatchAsyncErrors(async (req, res, next) => {
  const getPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: { company: "SwiftCart" },
  });

  res.status(200).json({ success: true, client_secret: getPayment.client_secret });
});

exports.transferStripeAPI = CatchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeAPIKey: process.env.STRIPE_API_KEY });
});
