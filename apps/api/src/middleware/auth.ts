import { Fail } from "@axon/utils";
import { AuthObject } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

const isUserAuth = (
  auth: AuthObject
): auth is AuthObject & { userId: string } => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof (auth as any).userId === "string";
};

export const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !isUserAuth(req.auth)) {
      return res.status(401).json(Fail("Unauthorized"));
    }
    next();
  };
};
