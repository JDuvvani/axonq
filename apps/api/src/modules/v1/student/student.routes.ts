import { Router } from "express";
import {
  createStudentSchema,
  deleteStudentSchema,
  getStudentByIdSchema,
  updateStudentSchema,
} from "@axon/types";
import { validate } from "@middleware/validate.js";
import { studentController } from "./student.controller.js";

const router: Router = Router();

router.get("/", studentController.listStudents);

router.post(
  "/",
  validate(createStudentSchema),
  studentController.createStudent
);

router.get(
  "/:id",
  validate(getStudentByIdSchema),
  studentController.getStudentById
);

router.put(
  "/:id",
  validate(updateStudentSchema),
  studentController.updateStudent
);

router.delete(
  "/:id",
  validate(deleteStudentSchema),
  studentController.deleteStudent
);

export const studentRoutes = router;
