import { prisma } from "../../config/db";
import bcrypt from "bcrypt";

import {
    RegisterDTO,
    LoginDTO,
    forgetPasswordDTO,
    resetPasswordDTO,
    uploadNationalIdDTO,
} from "./auth.types";
import AppError from "../../utils/AppError";
import { sendEmailTemplate } from "../../config/sendMail";
import { generateToken } from "../../Helpers/generateToken";
import { hashPassword } from "../../Helpers/hashPassword";

const sanitizeUser = (user: any) => {
    const { userHashedPassword, resetCode, resetCodeExpiry, ...safe } = user;
    return safe;
};

// ===== Services =====
export const register = async (data: RegisterDTO) => {
    const existing = await prisma.user.findFirst({
        where: {
            OR: [
                { userEmail: data.userEmail },
                data.nationalIdNumber
                    ? { nationalIdNumber: data.nationalIdNumber }
                    : undefined,
            ].filter(Boolean) as any[],
        },
    });

    if (existing) throw new AppError("Email or national ID already registered", 400);

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            userEmail: data.userEmail,
            userPhoneNumber: data.userPhoneNumber ?? "",
            userHashedPassword: hashed,
            role: data.role ?? "UN_VERIFIEDUSER",
            nationalIdNumber: data.nationalIdNumber,
            nationalIdFront: data.nationalIdFront,
            nationalIdBack: data.nationalIdBack,
        },
    });

    return {
        user: sanitizeUser(user),
        token: generateToken({ id: user.id, role: user.role }),
    };
};

export const login = async (data: LoginDTO) => {
    const user = await prisma.user.findUnique({
        where: { userEmail: data.userEmail },
    });

    if (!user || !(await bcrypt.compare(data.password, user.userHashedPassword))) {
        throw new AppError("Invalid credentials", 401);
    }
    if (user.role === "BLOCKED" as any) {
        throw new AppError("User is blocked", 401);
    }
    return {
        user: sanitizeUser(user),
        token: generateToken({ id: user.id, role: user.role }),
    };
};

export const forgetPassword = async (data: forgetPasswordDTO) => {
    const user = await prisma.user.findUnique({
        where: { userEmail: data.userEmail },
    });

    if (!user) throw new AppError("User not found", 404);

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryMinutes = 15;

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetCode,
            resetCodeExpiry: new Date(Date.now() + expiryMinutes * 60 * 1000),
        },
    });

    await sendEmailTemplate(user.userEmail, "Reset Password Code", "resetPassword", {
        name: user.firstName,
        resetCode,
        expiryMinutes,
    });

    return { message: "Password reset code sent to your email" };
};

export const resetPassword = async (data: resetPasswordDTO) => {
    const user = await prisma.user.findUnique({
        where: { userEmail: data.userEmail },
    });

    if (!user || !user.resetCodeExpiry || user.resetCode !== data.resetCode) {
        throw new AppError("Invalid or expired reset code", 400);
    }
    if (user.resetCodeExpiry < new Date()) {
        throw new AppError("Reset code has expired", 400);
    }


    const hashed = await hashPassword(data.newPassword);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            userHashedPassword: hashed,
            resetCode: null,
            resetCodeExpiry: null,
        },
    });

    return { message: "Password updated successfully" };
};
export const uploadNationalId = async (data: uploadNationalIdDTO) => {
  // 1. Check if user exists
  const user = await prisma.user.findUnique({
    where: { userEmail: data.userEmail },
  });
  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  // 2. Validate that the front and back images exist in File table
  const frontImage = await prisma.file.findUnique({
    where: { id: data.frontImageId },
  });
  if (!frontImage) {
    throw new AppError("Front image file not found", 400);
  }

  let backImage = null;
  if (data.backImageId) {
    backImage = await prisma.file.findUnique({
      where: { id: data.backImageId },
    });
    if (!backImage) {
      throw new AppError("Back image file not found", 400);
    }
  }

  // 3. Create a new validation record linking to File IDs
  const validation = await prisma.nationalIdValidation.create({
    data: {
      userId: user.id,
      frontImageId: data.frontImageId,
      backImageId: data.backImageId || null,
      nationalIdNumber: data.nationalIdNumber,
      status: "PENDING",
    },
  });

  // 4. Update user status to PENDING
  await prisma.user.update({
    where: { id: user.id },
    data: { nationalIdStatus: "PENDING" },
  });

  return validation;
};