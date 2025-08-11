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