import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger";
import { Bootstrap } from "./modules/bootstrap";
import { errorHandler } from "./middlewares/error.middleware";
import requestLogger from "./middlewares/requestLogger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger); 
setupSwagger(app);
Bootstrap(app);
app.use(errorHandler);
export default app;
