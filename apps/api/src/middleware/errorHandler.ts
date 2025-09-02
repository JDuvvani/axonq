import { logger } from "@axon/logger";
import { Fail } from "@axon/utils";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  /* eslint-disable @typescript-eslint/no-explicit-any */
  err: any,
  _req: Request,
  res: Response,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _next: NextFunction
) => {
  logger.error(err);

  if (err.status) {
    return res.status(err.status).json(Fail(err.message));
  }

  res.status(500).json(Fail("Internal Server Error"));
};
