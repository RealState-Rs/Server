import express from "express";
import { uploadDynamic } from "../../config/multer";
import { saveFile, getFileById } from "../../services/fileService";

const router = express.Router();

// Upload endpoint
router.post("/local", uploadDynamic().single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Save file to DB (VERIFICATION type by default, you can change dynamically)
    const saved = await saveFile(req.file, "DOCUMENT");

    return res.json({ id: saved.id, url: `${process.env.SERVER_BASE_URL}${saved.url}` });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "File upload failed" });
  }
});

// Retrieve file info by ID
router.get("/:id", async (req, res) => {
  try {
    const file = await getFileById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    return res.json(file);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch file" });
  }
});

export default router;
