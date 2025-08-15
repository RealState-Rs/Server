import { Router } from "express";
import * as AuthController from "./auth.controller";
import { uploadDynamic } from "../../config/multer";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post('/forget-password', AuthController.forgetPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post(
  "/upload-national-id",
  uploadDynamic("verifications").fields([
    { name: "nationalIdFront", maxCount: 1 },
    { name: "nationalIdBack", maxCount: 1 },
  ]),
  AuthController.uploadNationalId
);

export default router;
