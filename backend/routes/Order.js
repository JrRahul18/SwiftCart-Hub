const express = require('express')
const router = express.Router();
const { isAuthenticated, checkRole } = require("../middleware/Auth");
const orderController = require("../controllers/Order");


router.post('/order/new', isAuthenticated, orderController.createNewOrder)
router.get('/order/:id', isAuthenticated,  orderController.getOrderDetails )
router.get('/orders/me', isAuthenticated, orderController.myOrders)
router.get('/admin/orders', isAuthenticated, checkRole("admin"), orderController.getAllOrders)
router.put('/admin/order/:id', isAuthenticated, checkRole("admin"), orderController.updateOrder)
router.delete('/admin/order/:id', isAuthenticated, checkRole("admin"), orderController.deleteOrder)


module.exports = router