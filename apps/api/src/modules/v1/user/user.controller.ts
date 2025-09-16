/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userService } from "./user.service.js";
import { ValidatedRequest } from "@middleware/validate.js";
import {
  addChildSchema,
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "@axon/types";
import { Fail, Success } from "@axon/utils";
import { getAuth } from "@clerk/express";

class UserController {
  createUser = async (
    req: ValidatedRequest<typeof createUserSchema>,
    res: Response
  ) => {
    try {
      const user = await userService.createUser(req.body);

      return res.status(201).json(Success("User created", user));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message || "Failed to create user"));
    }
  };

  getUserById = async (
    req: ValidatedRequest<typeof getUserByIdSchema>,
    res: Response
  ) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json(Fail("User not found"));
      }

      return res.json(Success("User retrieved", user));
    } catch (err: any) {
      return res
        .status(500)
        .json(Fail(err.message || "Failed to get user by Id"));
    }
  };

  getMeByClerkId = async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).json(Fail("Not authenticated"));
      const user = await userService.getUserByClerkId(userId);
      if (!user) {
        return res.status(404).json(Fail("User not found"));
      }

      return res.json(Success("User retrieved", user));
    } catch (err: any) {
      return res
        .status(500)
        .json(Fail(err.message || "Failed to get user by clerkId"));
    }
  };

  updateUser = async (
    req: ValidatedRequest<typeof updateUserSchema>,
    res: Response
  ) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json(Fail("User not found"));
      }

      return res.json(Success("User updated", user));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message || "Failed to update user"));
    }
  };

  deleteUser = async (
    req: ValidatedRequest<typeof getUserByIdSchema>,
    res: Response
  ) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json(Fail("User not found"));
      }

      return res.json(Success("User deleted", user));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message || "Failed to delete user"));
    }
  };

  listUsers = async (req: any, res: Response) => {
    try {
      const users = await userService.listUsers();
      return res.json(Success("Users list retrieved", users));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message || "Failed to fetch users"));
    }
  };

  addChild = async (
    req: ValidatedRequest<typeof addChildSchema>,
    res: Response
  ) => {
    try {
      const updated = await userService.addChild(req.params.id, req.body);

      return res.json(Success("Child added", updated));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };
}

export const userController = new UserController();
