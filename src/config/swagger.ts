import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import type { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

export const setupSwagger = (app: Express) => {
  const swaggerPath = path.join(__dirname, "../../docs/swagger.yaml");
  const swaggerDocument = YAML.load(swaggerPath);

  // Replace placeholder with actual env var
  const serverUrl = process.env.SERVER_BASE_URL;
  if (swaggerDocument.servers && swaggerDocument.servers.length > 0) {
    swaggerDocument.servers[0].url = serverUrl;
  }

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
