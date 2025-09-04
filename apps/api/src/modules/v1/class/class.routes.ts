import { Router } from "express";
import { classController } from "./class.controller.js";
import { validate } from "@middleware/validate.js";
import {
  createClassSchema,
  deleteClassSchema,
  getClassByIdSchema,
  updateClassSchema,
} from "@axon/types";

const router: Router = Router();

router.get("/", classController.listClasses);

router.post("/", validate(createClassSchema), classController.createClass);

router.get("/:id", validate(getClassByIdSchema), classController.getClassById);

router.put("/:id", validate(updateClassSchema), classController.updateClass);

router.delete("/:id", validate(deleteClassSchema), classController.deleteClass);

export const classRoutes = router;
