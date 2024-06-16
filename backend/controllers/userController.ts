import { Request, Response } from "express";
import User from "../models/userModel";
const bcryptjs = require("bcryptjs");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.registerUser = catchAsyncError(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // const salt = await bcryptjs.gensalt(10);
  // const secPass = await bcryptjs.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(201).json({
    success: true,
    user,
  });
});
