import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import sendToken from "../utils/sendToken";
import { Document } from "mongoose";
import { NewUserRequestBody } from "../types/types";
const bcrypt = require("bcryptjs");
import { check, validationResult } from "express-validator";
import resError from "../tools/resError";
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

exports.registerUser = catchAsyncError(
  async (req: Request<{}, {}, NewUserRequestBody>, res: Response) => {
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
  }
);

exports.loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    await check("email", "Please enter a valid email").isEmail().run(req);
    await check("password", "Please enter a password").notEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resError(400, errors.array(), res);
    } else {
      const userDoc = await User.findOne({ email }).select("+password");

      if (!userDoc) {
        return resError(401, "Invalid email or password", res);
      }
      const savedPassword = userDoc.password;
      const passwordCompare = await bcrypt.compareSync(password, savedPassword);

      if (!passwordCompare) {
        return resError(401, "Password not matched", res);
      } else {
        const user = mapUserDocumentToUser(userDoc);
        return sendToken(user, 200, res);
      }
    }
  }
);
