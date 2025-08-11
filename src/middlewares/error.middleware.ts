import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError"; // your custom error class

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If error is your custom AppError, use its status and message
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Otherwise, internal server error
  console.error(err); // log full error
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
