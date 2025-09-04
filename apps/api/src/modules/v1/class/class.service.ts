import { CreateClassDTO, UpdateClassDTO } from "@axon/types";
import { IClassDoc } from "./class.model.js";
import { userService } from "../user/user.service.js";
import { classRepo } from "./class.repo.js";
import { userRepo } from "../user/user.repo.js";
import { ClassSample } from "@v1/user/user.model.js";

class ClassService {
  createClass = async (data: CreateClassDTO): Promise<IClassDoc> => {
    const teacher = await userService.getUserById(data.teacher);
    if (!teacher) throw new Error("Teacher not found");
    if (teacher.role !== "TEACHER")
      throw new Error("Provided teacherId is not a TEACHER");

    const newClass = await classRepo.create(data);
    const classSample: ClassSample = {
      classId: newClass.id,
      name: newClass.name,
    };
    await userRepo.addClass(newClass.teacher, classSample);

    return newClass;
  };

  getClassById = async (id: string): Promise<IClassDoc | null> => {
    return classRepo.findById(id);
  };

  updateClass = async (
    id: string,
    data: UpdateClassDTO
  ): Promise<IClassDoc | null> => {
    let updated;
    if (data.teacher) {
      const teacher = await userService.getUserById(data.teacher);
      if (!teacher) throw new Error("New teacher not found");
      if (teacher.role !== "TEACHER")
        throw new Error("New teacher is not a TEACHER");

      const [old, result] = await Promise.all([
        classRepo.findById(id),
        classRepo.update(id, data),
      ]);
      if (!old || !result) return null;

      updated = result;
      const classSample: ClassSample = {
        classId: updated.id,
        name: updated.name,
      };

      Promise.all([
        userRepo.addClass(updated.teacher, classSample),
        userRepo.removeClass(old.teacher, updated.id),
      ]);
    } else {
      updated = await classRepo.update(id, data);
    }

    return updated;
  };

  deleteClass = async (id: string): Promise<IClassDoc | null> => {
    const deleted = await classRepo.delete(id);
    if (deleted) await userRepo.removeClass(deleted.teacher, deleted.id);

    return deleted;
  };

  listClasses = async (): Promise<IClassDoc[]> => {
    return await classRepo.list();
  };
}

export const classService = new ClassService();
