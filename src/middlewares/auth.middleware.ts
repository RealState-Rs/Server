import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { Role } from "../../generated/prisma";
interface JwtPayload {
    id: string;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Unauthorized", 401);
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as JwtPayload;

        (req as any).user = decoded; 
        next();
    } catch (error) {
        console.error("JWT verify error:", error);
        next(new AppError("Unauthorized", 401));
    }
};

export const roleGuard = (...allowedRoles: Role[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {


        const user = req.user; 

        if (!user || !user.role) {
            return next(new AppError("User not authenticated", 401));
        }

        if (!allowedRoles.includes(user.role)) {
            return next(new AppError("Forbidden: insufficient role", 403));
        }

        next();
    };
};
