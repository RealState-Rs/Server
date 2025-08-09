import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import type { Express } from "express";

export const setupSwagger = (app: Express) => {
  const swaggerPath = path.join(__dirname, "../../docs/swagger.yaml");
  const swaggerDocument = YAML.load(swaggerPath);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
