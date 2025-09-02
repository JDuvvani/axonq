import express, { json, urlencoded, type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./modules/v1/user/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createApp = (): Express => {
  const app = express();

  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors());
  app.use(helmet());

  app.use("/api/v1/users", userRouter);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
  });

  app.use(errorHandler);

  return app;
};
