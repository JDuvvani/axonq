import { Router } from "express";
import { validate } from "@middleware/validate.js";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "@axon/types";
import { userController } from "./user.controller.js";

const router: Router = Router();

router.get("/", userController.listUsers);

router.post("/", validate(createUserSchema), userController.createUser);

router.get("/:id", validate(getUserByIdSchema), userController.getUserById);

router.put("/:id", validate(updateUserSchema), userController.updateUser);

router.delete("/:id", validate(getUserByIdSchema), userController.deleteUser);

export const userRoutes = router;
