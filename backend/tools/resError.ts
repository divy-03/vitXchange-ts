import { Response } from "express";

const resError = (statusCode: number, error: string, res: Response) => {
  res.status(statusCode).json({
    success: false,
    error: error,
  });
};

export default resError;
