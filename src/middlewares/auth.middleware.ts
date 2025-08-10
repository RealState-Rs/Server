import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma";
import AppError from "../utils/AppError";

export const roleGuard = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user; // should come from auth middleware

    if (!user || !user.role) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new AppError("Forbidden: insufficient role", 403));
    }

    next();
  };
};
