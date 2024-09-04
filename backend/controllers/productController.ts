import { Request, Response } from "express";
import Product, { IProduct } from "../models/productModel";
import { NewProductRequestBody } from "../types/types";
import resError from "../tools/resError";
import resSuccess from "../tools/resSuccess";
import mongoose from "mongoose";
import User from "../models/userModel";
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createProduct = catchAsyncError(
  async (req: Request<{}, {}, NewProductRequestBody>, res: Response) => {
    req.body.user = req.user?.id;
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      product,
    });
  }
);

exports.getAllProducts = catchAsyncError(
  async (req: Request, res: Response) => {
    const products = await Product.find();

    res.status(200).json({
      status: true,
      products,
    });
  }
);

exports.getProductDetails = catchAsyncError(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) return resError(404, "Product not found with this id", res);

    res.status(200).json({
      success: true,
      product,
    });
  }
);

exports.updateProduct = catchAsyncError(async (req: Request, res: Response) => {
  let product = await Product.findById(req.params.id);
  if (!product) return resError(404, "Product not found", res);

  const user = req.user;
  if (user?.role !== "admin" || user.id !== product.user.toString()) {
    return resError(401, "Unauthorized", res);
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return resError(404, "Product not found", res);

  const user = req.user;
  if (user?.role !== "admin" || user.id !== product.user.toString()) {
    return resError(401, "Unauthorized", res);
  }
  await product.deleteOne();

  return resSuccess(200, "Product deleted successfully", res);
});

// export const getCartProducts = catchAsyncError(
//   async (req: Request, res: Response) => {
//     const user = await User.findById(req.user?.id).populate('cart');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     let totalAmount = 0;
//     user.cart.forEach((product) => {
//       totalAmount += (product as IProduct).price;
//     });

//     res.status(200).json({
//       success: true,
//       totalAmount,
//       cartItems: user.cart,
//     });
//   }
// );

// export const addToCart = catchAsyncError(async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   const { productId } = req.body

//   if (
//     !mongoose.Types.ObjectId.isValid(userId) ||
//     !mongoose.Types.ObjectId.isValid(productId)
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid ID format" });
//   }

//   const user = await User.findByIdAndUpdate(
//     userId,
//     { $push: { cart: productId } },
//     { new: true, useFindAndModify: false }
//   ).populate("cart");

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   res.status(200).json({
//     success: true,
//     cart: user.cart,
//   });
// });
