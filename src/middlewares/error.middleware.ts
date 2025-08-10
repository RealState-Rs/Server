import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import AppError from "../utils/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err instanceof AppError && err.statusCode) || 500;

  // Log the error details
  logger.error(`${req.method} ${req.url} - ${err.message}`, {
    stack: err.stack,
    statusCode
  });

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });
};
