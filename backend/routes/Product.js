const express = require("express");
const { getAllProducts } = require("../controllers/Product");
const productController = require("../controllers/Product");
const { isAuthenticated, checkRole } = require("../middleware/Auth");
const router = express.Router();

// router.route("/products").get(getAllProducts)
router.get("/products",productController.getAllProducts);
router.get("/admin/products", isAuthenticated, checkRole("admin") ,productController.getAllAdminProducts);
router.post("/admin/product/new", isAuthenticated, checkRole("admin"), productController.createProduct);
router.put("/admin/product/:id", isAuthenticated, checkRole("admin"), productController.updateProduct);
router.delete("/admin/product/:id", isAuthenticated, checkRole("admin"), productController.deleteProduct);
router.get("/product/:id", productController.getProduct);
router.put("/review", isAuthenticated, productController.createReview)
router.get("/reviews", productController.getProductReviews);
router.delete("/reviews", isAuthenticated, productController.deleteReview)

module.exports = router;
