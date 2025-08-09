import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger"; 
import { Bootstrap } from "./modules/bootstrap";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Initialize Swagger docs
setupSwagger(app);
Bootstrap(app)
app.get("/", (_req, res) => {
  res.json({ message: "Real Estate API is running 🚀" });
});

export default app;
