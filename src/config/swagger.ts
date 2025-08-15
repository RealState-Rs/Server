import { OpenAPIV3 } from "openapi-types";
import path from "path";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import SwaggerParser from "@apidevtools/swagger-parser";
import type { Express } from "express";

dotenv.config();

export const setupSwagger = async (app: Express) => {
  const swaggerPath = path.join(__dirname, "../../docs/openapi.yaml");
  
  const swaggerDocument = await SwaggerParser.dereference(swaggerPath) as OpenAPIV3.Document;
  
  const serverUrl = process.env.SERVER_BASE_URL;
  if (swaggerDocument.servers && swaggerDocument.servers.length > 0) {
    swaggerDocument.servers[0].url = serverUrl || "";
  }

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
