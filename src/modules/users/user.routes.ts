import { Router } from "express";

import { Role } from "../../../generated/prisma";
import * as userController from './user.controller';
import { authMiddleware, roleGuard } from "../../middlewares/auth.middleware";
const router = Router()


router.get('/', authMiddleware, roleGuard(Role.ADMIN, Role.SUPERADMIN), userController.getAllUsers);
router.get('/user-profile', authMiddleware, roleGuard(Role.SELLER, Role.BUYER, Role.UN_VERIFIEDUSER), userController.getUserProfile);
router.get('/admin/user-verifications', authMiddleware, roleGuard(Role.SUPERADMIN, Role.ADMIN), userController.getUsersVerifications);
router.put('/user-profile', authMiddleware, roleGuard(Role.SELLER, Role.BUYER, Role.UN_VERIFIEDUSER,Role.ADMIN), userController.updateUserProfile);
router.patch('/block-user/:userId',authMiddleware, roleGuard(Role.SUPERADMIN, Role.ADMIN), userController.blockUser);
export default router;
