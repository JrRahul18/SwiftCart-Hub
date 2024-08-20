const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter the Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please enter the Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the Product Price"],
    maxLength: [8, "Price cannot exceed further"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the Product stock"],
    maxLength: [4, "Stock cannot exceed 4 chars."],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
