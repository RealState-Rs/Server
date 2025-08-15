
import { v4 as uuidv4 } from "uuid";
import type { Express } from "express";
import { prisma } from "../config/db";

export const saveFile = async (
  file: Express.Multer.File,
  type: "VERIFICATION" | "PROPERTY" | "AVATAR" | "DOCUMENT" 
) => {
  // Generate a UUID (optional since Prisma will do it too)
  const id = uuidv4();

  // Save to database
  const dbFile = await prisma.file.create({
    data: {
      id, // optional: Prisma can generate UUID
      type,
      url: `/${file.path.replace(/\\/g, "/")}`, // local path
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    },
  });

  return dbFile;
};

export const getFileById = async (id: string) => {
  return prisma.file.findUnique({ where: { id } });
};
