const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../middleware/CatchAsyncErrors");

exports.createNewOrder = CatchAsyncErrors(async (req, res, next) => {
  const {
    shippingInformation,
    orderItems,
    paymentInformation,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const newOrder = await Order.create({
    shippingInformation,
    orderItems,
    paymentInformation,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(201).json({ success: true, newOrder: newOrder });
});

exports.getOrderDetails = CatchAsyncErrors(async (req, res, next) => {
  const extractOrderId = req.params.id;
  const order = await Order.findById(extractOrderId).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({ success: true, order: order });
});

exports.myOrders = CatchAsyncErrors(async (req, res, next) => {
  const getUserId = req.user.id;
  const orders = await Order.find({ user: getUserId });
  res.status(200).json({ success: true, myOrders: orders });
});

exports.getAllOrders = CatchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let total = 0;
  let count = 0;
  orders.forEach((order) => {
    total += order.totalPrice;
    count++;
  });

  res.status(200).json({ success: true, allOrders: orders, totalAmount: total, totalOrders: count });
});

exports.updateOrder = CatchAsyncErrors(async (req, res, next) => {
  const extractOrderId = req.params.id;
  const order = await Order.findById(extractOrderId);

  // console.log("Order", order)

  if (!order) {
    return next(new ErrorHandler(`Order not found with id: ${extractOrderId}`, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Product already delievered", 400));
  }

  if(req.body.status === "Shipped"){
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }
  
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, order });
});

exports.deleteOrder = CatchAsyncErrors(async (req, res, next) => {
  const extractOrderId = req.params.id;
  const order = await Order.findById(extractOrderId);

  if (!order) {
    return next(new ErrorHandler(`Order not found with id: ${extractOrderId}`, 404));
  }

  await order.deleteOne()
  res
    .status(200)
    .json({ success: true, deletedOrder: order });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  product.save({ validateBeforeSave: false });
}
