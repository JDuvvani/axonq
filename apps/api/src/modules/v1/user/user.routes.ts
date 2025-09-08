import { Router } from "express";
import { validate } from "@middleware/validate.js";
import {
  addChildSchema,
  createParentSchema,
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "@axon/types";
import { userController } from "./user.controller.js";

const router: Router = Router();

router.get("/", userController.listUsers);

router.post("/", validate(createUserSchema), userController.createUser);

router.post(
  "/parent",
  validate(createParentSchema),
  userController.createParent
);

router.get("/:id", validate(getUserByIdSchema), userController.getUserById);

router.put("/:id", validate(updateUserSchema), userController.updateUser);

router.put("/:id/child", validate(addChildSchema), userController.addChild);

router.delete("/:id", validate(getUserByIdSchema), userController.deleteUser);

export const userRoutes = router;
