import express, { json, urlencoded, type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { userRoutes } from "@v1/user/user.routes.js";
import { classRoutes } from "@v1/class/class.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { studentRoutes } from "@v1/student/student.routes.js";

export const createApp = (): Express => {
  const app = express();

  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors());
  app.use(helmet());

  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/classes", classRoutes);
  app.use("/api/v1/students", studentRoutes);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
  });

  app.use(errorHandler);

  return app;
};
