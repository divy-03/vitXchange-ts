import { Request, Response } from "express";
import User from "../models/userModel";
import sendToken from "../utils/sendToken";
import { Document } from "mongoose";
import { NewUserRequestBody } from "../types/types";
const bcrypt = require("bcryptjs");
import sendEmail from "../utils/sendEmail";
import { check, validationResult } from "express-validator";
import resError from "../tools/resError";
import resSuccess from "../tools/resSuccess";
import crypto from "crypto";
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

exports.loginUser = catchAsyncError(async (req: Request, res: Response) => {
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
});

exports.logOutUser = catchAsyncError(async (req: Request, res: Response) => {
  res.cookie("xToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  resSuccess(200, "Logged out Successfully", res);
});

exports.getCookieToken = catchAsyncError(
  async (req: Request, res: Response) => {
    const token = req.cookies.xToken;
    resSuccess(200, token, res);
  }
);

exports.getUser = catchAsyncError(async (req: Request, res: Response) => {
  const filter = req.user ? { _id: req.user._id } : {}; // Filter by ID if available
  const user = await User.findOne(filter);

  return res.status(200).json({
    success: true,
    user,
  });
});

exports.forgotPassword = catchAsyncError(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return resError(404, "User not found", res);
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.CLIENT_BASE_URL}/reset/${resetToken}`;
    // return resSuccess(200, resetPasswordUrl, res);

    const message = `Your password reset link is => \n\n ${resetPasswordUrl} \n\nIf you have not requested to reset password then please ignore this mail`;
    try {
      await sendEmail({
        email: user.email,
        subject: "VitXchange Password Recovery",
        message: message,
        html: `<div style="background-image: linear-gradient(to right bottom, #ae95ffab 40%, rgb(210, 103, 117, 0.4)); margin:0;">
          <h1 style="color: #333; margin-left: 10px;">Password Reset Link</h1>
          <p style="font-size: 16px; margin-left:20px;">Click this link below to reset your password of VitXchange Website</p>
          <a href="${resetPasswordUrl}" style="text-decoration: none; background: black; color: white; border-radius: 8px; padding: 10px; text-align: center; width: 80px; margin-left: 50px; transition: background 0.3s;" onmouseover="this.style.background='rgb(45 45 45)'"
          onmouseout="this.style.background='black'">Click Here!</a>
          <p style="font-size: 16px; margin-left:20px;">If you didn't requested to reset password then please ignore this mail</p>
    </div>`,
      });

      resSuccess(200, `Email sent to ${user.email}`, res);
    } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;

      await user.save({ validateBeforeSave: false });

      return resError(500, "Error Occured while sending Mail", res);
    }
  }
);

exports.resetPassword = catchAsyncError(async (req: Request, res: Response) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return resError(400, "Reset password link is invalid or expired", res);
  }
  if (req.body.password !== req.body.confirmPassword) {
    return resError(400, "Password doesn't match", res);
  }

  const salt = await bcrypt.genSaltSync(10);
  const secPass = await bcrypt.hashSync(req.body.password, salt);

  user.password = secPass;

  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  const userObj = mapUserDocumentToUser(user);
  sendToken(userObj, 200, res);
});

exports.updatePassword = catchAsyncError(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id).select("+password");

    const passswordCompare = await bcrypt.compareSync(
      req.body.oldPassword,
      user?.password
    );

    if (!passswordCompare) {
      return resError(401, "Password not matched", res);
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return resError(401, "New password not matched", res);
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.newPassword, salt);

    if (user) {
      user.password = secPass;
    }

    await user?.save();

    if (user) return sendToken(user.toObject(), 200, res);
  }
);

exports.updateProfile = catchAsyncError(async (req: Request, res: Response) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // TODO: avatar image

  await User.findByIdAndUpdate(req.user?._id);
});
