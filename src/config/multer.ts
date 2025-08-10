// src/services/upload.service.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.body.folderName || "general"; 
    const uploadPath = path.join("uploads", folderName);

    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});

export const uploadDynamic = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});
