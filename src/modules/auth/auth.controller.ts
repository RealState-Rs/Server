import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validators";

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
