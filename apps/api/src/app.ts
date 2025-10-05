import express, { json, urlencoded, type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { userRoutes } from "@v1/user/user.routes.js";
import { classRoutes } from "@v1/class/class.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { classMemberRoutes } from "@v1/class-member/class-member.routes.js";
import { clerkMiddleware } from "@clerk/express";

export const createApp = (): Express => {
  const app = express();
  const corsOptions = {
    origin: "*",
  };

  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(clerkMiddleware());

  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/classes", classRoutes);
  app.use("/api/v1/students", classMemberRoutes);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
  });

  app.use(errorHandler);

  return app;
};
