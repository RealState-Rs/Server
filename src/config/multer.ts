import multer from "multer";
import path from "path";
import fs from "fs";

export const uploadDynamic = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.body.folder || "general"; // fallback if not sent
      const uploadPath = path.join("uploads", folder);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};
