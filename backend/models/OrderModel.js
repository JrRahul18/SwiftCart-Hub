const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInformation: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    contactNumber: {
      type: Number,
      maxLength: [10, "Contact Number exceed more than 10 digits,"],
      minLength: [10, "Contact Number exceed more than 10 digits,"],
      required: true,
    },
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInformation: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: { type: Number, default: 0, required: true },
  taxPrice: { type: Number, default: 0, required: true },
  shippingPrice: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
  orderStatus: { type: String, required: true, default: "Processing" },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Order", orderSchema);
