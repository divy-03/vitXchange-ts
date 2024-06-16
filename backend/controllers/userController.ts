import { Request, Response } from "express";
import User from "../models/userModel";
import sendToken from "../utils/sendToken";
import { Document } from "mongoose";
const bcrypt = require("bcryptjs");
const catchAsyncError = require("../middleware/catchAsyncError");

const mapUserDocumentToUser = (userDoc: Document) => {
  const userObj = userDoc.toObject();
  return {
    id: userObj._id.toString(),
    name: userObj.name,
    email: userObj.email,
    password: userObj.password,
    role: userObj.role,
  };
};

exports.registerUser = catchAsyncError(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const secPass = await bcrypt.hashSync(password, salt);

  const userDoc = await User.create({
    name,
    email,
    password: secPass,
  });

  const user = mapUserDocumentToUser(userDoc);

  return sendToken(user, 201, res);
});
