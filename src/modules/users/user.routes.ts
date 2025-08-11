import { Router } from "express";

import { Role } from "../../../generated/prisma";
import * as userController from './user.controller';
import { authMiddleware, roleGuard } from "../../middlewares/auth.middleware";
const router = Router()


router.get('/', authMiddleware,roleGuard(Role.ADMIN, Role.SUPERADMIN), userController.getAllUsers);


export default router;