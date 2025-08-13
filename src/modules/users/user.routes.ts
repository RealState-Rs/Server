import { Router } from "express";

import { Role } from "../../../generated/prisma";
import * as userController from './user.controller';
import { authMiddleware, roleGuard } from "../../middlewares/auth.middleware";
const router = Router()


router.get('/users', authMiddleware,roleGuard(Role.ADMIN, Role.SUPERADMIN), userController.getAllUsers);
router.get('/user-profile', authMiddleware,roleGuard(Role.SELLER, Role.BUYER,Role.UN_VERIFIEDUSER,Role.ADMIN), userController.getUserProfile);
router.patch('/user-profile', authMiddleware, roleGuard(Role.SELLER, Role.BUYER,Role.UN_VERIFIEDUSER,Role.ADMIN), userController.updateUserProfile);

export default router;