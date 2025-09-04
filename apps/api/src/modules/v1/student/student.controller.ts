/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ValidatedRequest } from "@middleware/validate.js";
import {
  createStudentSchema,
  deleteStudentSchema,
  getStudentByIdSchema,
  updateStudentSchema,
} from "@axon/types";
import { Fail, Success } from "@axon/utils";
import { studentService } from "./student.service.js";

class StudentController {
  createStudent = async (
    req: ValidatedRequest<typeof createStudentSchema>,
    res: Response
  ) => {
    try {
      const student = await studentService.createStudent(req.body);
      return res.status(201).json(Success("Student created", student));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };

  getStudentById = async (
    req: ValidatedRequest<typeof getStudentByIdSchema>,
    res: Response
  ) => {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student) return res.status(404).json(Fail("Student not found"));

      return res.json(Success("Student retrieved", student));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  updateStudent = async (
    req: ValidatedRequest<typeof updateStudentSchema>,
    res: Response
  ) => {
    try {
      const updated = await studentService.updateStudent(
        req.params.id,
        req.body
      );
      if (!updated) return res.status(404).json(Fail("Student not found"));

      return res.json(Success("Student updated", updated));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };

  deleteStudent = async (
    req: ValidatedRequest<typeof deleteStudentSchema>,
    res: Response
  ) => {
    try {
      const deleted = await studentService.deleteStudent(req.params.id);
      if (!deleted) return res.status(404).json(Fail("Student not found"));

      return res.json(Success("Student deleted", deleted));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  listStudents = async (req: Request, res: Response) => {
    try {
      const students = await studentService.listStudents();
      return res.json(Success("Student list retrieved", students));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };
}

export const studentController = new StudentController();
