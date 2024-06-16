import { Response } from "express";

const jwt = require("jsonwebtoken");

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const sendToken = (user: User, statusCode: number, res: Response) => {
  const data = {
    user: {
      id: user.id,
    },
  };

  const authToken = jwt.sign(data, process.env.JWT_SECRET);

  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as const,
  };

  res.cookie("authToken", authToken, options);

  return res.status(statusCode).json({
    success: true,
    authToken,
    user,
  });
};

export default sendToken;
