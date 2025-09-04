/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import {
  createClassSchema,
  deleteClassSchema,
  getClassByIdSchema,
  updateClassSchema,
} from "@axon/types";
import { ValidatedRequest } from "@middleware/validate.js";
import { Fail, Success } from "@axon/utils";
import { classService } from "./class.service.js";
import { studentService } from "@v1/student/student.service.js";

class ClassController {
  createClass = async (
    req: ValidatedRequest<typeof createClassSchema>,
    res: Response
  ) => {
    try {
      const newClass = await classService.createClass(req.body);
      return res.status(201).json(Success("Class created", newClass));
    } catch (err: any) {
      return res
        .status(400)
        .json(Fail(err.message || "Failed to create class"));
    }
  };

  getClassById = async (
    req: ValidatedRequest<typeof getClassByIdSchema>,
    res: Response
  ) => {
    try {
      const klass = await classService.getClassById(req.params.id);
      if (!klass) return res.status(404).json(Fail("Class not found"));

      return res.json(Success("Class retrieved", klass));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  updateClass = async (
    req: ValidatedRequest<typeof updateClassSchema>,
    res: Response
  ) => {
    try {
      const updated = await classService.updateClass(req.params.id, req.body);
      if (!updated) return res.status(404).json(Fail("Class not found"));

      return res.json(Success("Class updated", updated));
    } catch (err: any) {
      return res.status(400).json(Fail(err.message));
    }
  };

  deleteClass = async (
    req: ValidatedRequest<typeof deleteClassSchema>,
    res: Response
  ) => {
    try {
      const deleted = await classService.deleteClass(req.params.id);
      if (!deleted) return res.status(404).json(Fail("Class not found"));

      return res.json(Success("Class deleted", deleted));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  listClasses = async (req: Request, res: Response) => {
    try {
      const list = await classService.listClasses();
      return res.json(Success("Class list retrieved", list));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };

  listStudents = async (
    req: ValidatedRequest<typeof getClassByIdSchema>,
    res: Response
  ) => {
    try {
      const result = await classService.getClassById(req.params.id);
      if (!result) return res.status(404).json(Fail("Class not found"));

      const list = await studentService.getStudentsByClass(req.params.id);
      return res.json(Success("Class students list retrieved", list));
    } catch (err: any) {
      return res.status(500).json(Fail(err.message));
    }
  };
}

export const classController = new ClassController();
