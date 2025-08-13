import { Request, Response } from "express";
import * as userServices from './user.service';
import { formatResponse } from "../../utils/responseFormatter";
import AppError from "../../utils/AppError";
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { data, pagination } = await userServices.getAllUsers(req.query);
        return res.json(formatResponse(true, "Users fetched successfully", data, pagination));
    } catch (error) {
        return new AppError("Error", 500);
    }
}
// 
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; 
        const userProfile = await userServices.getUserProfile(userId);
        return res.json(formatResponse(true, "User profile fetched successfully", userProfile));
    } catch (error) {
        return new AppError("Error fetching user profile", 500);
    }
};
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id; 
        const updatedData = req.body;
        const updatedUser = await userServices.updateUserProfile(userId, updatedData);
        return res.json(formatResponse(true, "User profile updated successfully", updatedUser));
    } catch (error) {
        return new AppError("Error updating user profile", 500);
    }
};