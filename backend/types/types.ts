import { NextFunction, Request, Response } from "express";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface NewUserRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
  _id: string;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
