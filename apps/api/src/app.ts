import express, { json, urlencoded, type Express } from "express";
import cors from "cors";
import helmet from "helmet";

export const createApp = (): Express => {
  const app = express();

  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors());
  app.use(helmet());

  app.get("/api/health", (_req, res) => {
    res.json({ health: "API is working" });
  });

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
  });

  return app;
};
