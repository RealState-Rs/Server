import { Role } from "../../../generated/prisma";
import { prisma } from "../../config/db";
import AppError from "../../utils/AppError";
import { buildPrismaQuery } from "../../utils/prismaQueryBuilder";


export const getAllUsers = async (query: Record<string, any>) => {
  try {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const prismaQuery = buildPrismaQuery({
      query,
      allowedFilters: ["userEmail", "id", "role"],
      page,
      limit,
    });

    const defaultSelectFields = {
      id: true,
      userEmail: true,
      role: true,
      createdAt: true,
      firstName: true,
      lastName: true,
      nationalIdFront: true,
      nationalIdBack: true,
    };

    const select = prismaQuery.select ?? defaultSelectFields;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        ...prismaQuery,
        select,
      }),
      prisma.user.count({ where: prismaQuery.where }),
    ]);

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw new AppError(
      error.message || "Failed to fetch users from database",
      500
    );
  }
};
export const getUserProfile = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userEmail: true,
        role: true,
        firstName: true,
        lastName: true,
        nationalIdFront: true,
        nationalIdBack: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw new AppError(
      error.message || "Failed to fetch user profile from database",
      500
    );
  }
};

export const getAllVerifications = async (query: Record<string, any>) => {
  try {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const prismaQuery = buildPrismaQuery({
      query,
      allowedFilters: ["userId", "userId", "nationalIdNumber", "status", "createdAt", "reviewedAt"],
      page,
      limit,
    });
    const defaultSelectFields = {
      userId: true,
      id: true,
      nationalIdNumber: true,
      createdAt: true,
      status: true,
      reviewedAt: true,
      frontImageUrl: true,
      backImageUrl: true,
    };

    const select = prismaQuery.select ?? defaultSelectFields;
    const [verifications, total] = await Promise.all([
      prisma.nationalIdValidation.findMany({
        ...prismaQuery,
        select: {
          ...defaultSelectFields,
          user: {
            select: {
              id: true,
              userEmail: true,
              firstName: true,
              role: true,
              lastName : true,
            }
          }
        },
      }),
      prisma.nationalIdValidation.count({ where: prismaQuery.where }), 
    ]);
    return {
      data: verifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  } catch (error) {
    console.log(error);
    throw new AppError(`error ${error}`, 500);
  }
}
export const updateUserProfile = async (userId: number, data: Record<string, any>) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        userEmail: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
    return updatedUser;
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    throw new AppError(
      error.message || "Failed to update user profile",
      500
    );
  }
}
export const blockUser = async (userId:number,data:Record<string, any>) => {
  try {
    const blockedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: Role.BLOCKED,
      },
      select: {
        id: true,
        userEmail: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    })
    return blockedUser;
  }
  catch(error: any) {
    console.error("Error Block user", error);
    throw new AppError(
      error.message || "Failed to update user profile",
      500
    );
  }
}
