import { logger } from "@axon/logger";
import { createApp } from "./app.js";
import { Server } from "http";

const app = createApp();
let server: Server;

const startServer = async () => {
  try {
    server = app.listen(5001, () => {
      logger.info(`API running on ${5001}`);
    });
  } catch (err) {
    logger.error(err, "Startup error:");
    shutdown(1);
  }
};

const shutdown = async (exitCode: number) => {
  try {
    logger.info("Shutting down server...");
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      logger.info("Server closed");
    }

    process.exit(exitCode);
  } catch (err) {
    logger.error(err, "Error during shutdown:");
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
process.on("uncaughtException", async (err) => {
  logger.error(err, "Uncaught exception:");
  await shutdown(1);
});
process.on("unhandledRejection", async (reason) => {
  logger.error(reason, "Unhandled rejection:");
  await shutdown(1);
});

startServer();
