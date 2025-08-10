import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { registerSchema, loginSchema, forgetPasswordSchema, resetPasswordSchema } from "./auth.validators";
import AppError from "../../utils/AppError";

export const register = async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);
    const result = await AuthService.register(validated);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.parse(req.body);
    const result = await AuthService.login(validated);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Login failed" });
  }
};
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const validated = forgetPasswordSchema.parse(req.body);
    const result = await AuthService.forgetPassword(validated);
    return res.json(result)
  } catch (error) {
    return new AppError("Error", 500)
  }
}
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const validated = resetPasswordSchema.parse(req.body);
    const result = await AuthService.resetPassword(validated);
    return res.json(result);
  } catch (error) {
    return new AppError("Error", 500)
  }
}