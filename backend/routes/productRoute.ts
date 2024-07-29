import express from "express";
import { addToCart } from "../controllers/productController";
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

router.route("/cart/products").get(fetchUser, getCartProducts);
router.route("/cart/add").post(fetchUser, addToCart);

module.exports = router;
