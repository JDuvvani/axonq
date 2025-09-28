import { Fail } from "@axon/utils";
import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { isAuthenticated } = getAuth(req);
    if (!isAuthenticated) {
      return res.status(401).json(Fail("Unauthorized"));
    }
    next();
  };
};
