import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { registerSchema, loginSchema, forgetPasswordSchema, resetPasswordSchema, nationalIdUploadSchema } from "./auth.validators";
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
};

export const uploadNationalId = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files?.nationalIdFront?.length || !files?.nationalIdBack?.length) {
      throw new AppError("Both front and back images are required", 400);
    }

    const frontFile = files.nationalIdFront[0];
    const backFile = files.nationalIdBack[0];

    const validated = nationalIdUploadSchema.parse({
      userEmail: req.body.userEmail,
      nationalIdNumber: req.body.nationalIdNumber,
      nationalIdFront: `/uploads/verifications/${frontFile.filename}`,
      nationalIdBack: `/uploads/verifications/${backFile.filename}`,
    });

    const result = await AuthService.uploadNationalId(validated);
    return res.status(201).json({
      message: "National ID submitted for verification",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "National ID upload failed" });
  }
};