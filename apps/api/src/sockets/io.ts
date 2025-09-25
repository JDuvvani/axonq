import { logger } from "@axon/logger";
import { Server } from "http";
import { Server as IOServer } from "socket.io";
import { verifyToken } from "@clerk/express";
import env from "@config/env.js";

export const initServer = (httpServer: Server): void => {
  const io = new IOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    try {
      await verifyToken(token, {
        secretKey: env.CLERK_SECRET_KEY,
      });
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    logger.info({ socketId: socket.id }, "User connected");

    socket.on("join-user", (userId: string) => {
      logger.info({ joined: userId }, "User logged in");
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      logger.info({ socketId: socket.id }, "User disconnected");
    });
  });
};
