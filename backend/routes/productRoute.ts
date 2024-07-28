import express from "express";
const router = express.Router();
const { fetchUser } = require("../middleware/auth");
const {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getCartProducts,
} = require("../controllers/productController");

router.route("/product/new").post(fetchUser, createProduct);
router.route("/product/all").get(getAllProducts);
router
  .route("/product/:id")
  .delete(fetchUser, deleteProduct)
  .put(fetchUser, updateProduct)
  .get(getProductDetails);

router.route("/cart/products").get(getCartProducts);

module.exports = router;
