import { Router } from "express";
import { validate } from "@middleware/validate.js";
import {
  addChildSchema,
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "@axon/types";
import { userController } from "./user.controller.js";
import { authenticate } from "@middleware/auth.js";

const router: Router = Router();

router.get("/", userController.listUsers);

router.post("/", validate(createUserSchema), userController.createUser);

router.get("/me", authenticate(), userController.getMeByClerkId);

router.get("/clerk/:id", userController.getUserByClerkId);

router.get("/:id", validate(getUserByIdSchema), userController.getUserById);

router.put("/:id", validate(updateUserSchema), userController.updateUser);

router.put("/:id/child", validate(addChildSchema), userController.addChild);

router.delete("/:id", validate(getUserByIdSchema), userController.deleteUser);

export const userRoutes = router;
