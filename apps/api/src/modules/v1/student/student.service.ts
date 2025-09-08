import { CreateStudentDTO, UpdateStudentDTO } from "@axon/types";
import { IStudentDoc } from "./student.model.js";
import { classService } from "@v1/class/class.service.js";
import { studentRepo } from "./student.repo.js";
import { classRepo } from "@v1/class/class.repo.js";
import { IParentTokenDoc } from "./parentToken.model.js";
import { DeleteResult, UpdateResult } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ParentSample } from "@types";

class StudentService {
  createStudent = async (data: CreateStudentDTO): Promise<IStudentDoc> => {
    const result = await classService.getClassById(data.class);
    if (!result) throw new Error("Class not found");

    const student = await studentRepo.create(data);
    classRepo.addStudent(data.class);

    return student;
  };

  getStudentById = async (id: string): Promise<IStudentDoc | null> => {
    return studentRepo.findById(id);
  };

  getStudentsByClass = async (classId: string): Promise<IStudentDoc[]> => {
    return studentRepo.findByClass(classId);
  };

  updateStudent = async (
    id: string,
    data: UpdateStudentDTO
  ): Promise<IStudentDoc | null> => {
    return studentRepo.update(id, data);
  };

  deleteStudent = async (id: string): Promise<IStudentDoc | null> => {
    const deleted = await studentRepo.delete(id);
    if (deleted) {
      Promise.all([
        classRepo.removeStudent(deleted.class.toString()),
        studentRepo.deleteTokens(id),
      ]);
    }

    return deleted;
  };

  deleteByClass = async (classId: string): Promise<DeleteResult> => {
    const students = await studentRepo.findByClass(classId);
    const studentIds = students.map((s) => s.id.toString());

    await studentRepo.deleteAllTokens(studentIds);

    return await studentRepo.deleteByClass(classId);
  };

  deleteByClasses = async (classIds: string[]): Promise<DeleteResult> => {
    const deleted = await studentRepo.deleteByClasses(classIds);

    return deleted;
  };

  listStudents = async (): Promise<IStudentDoc[]> => {
    return studentRepo.list();
  };

  addParent = async (
    id: string,
    data: ParentSample
  ): Promise<IStudentDoc | null> => {
    return studentRepo.addParent(id, data);
  };

  removeParentFromAll = async (parentId: string): Promise<UpdateResult> => {
    return studentRepo.removeParentFromAll(parentId);
  };

  // Parent - Token

  generateParentToken = async (
    id: string,
    ttlHours = 48
  ): Promise<IParentTokenDoc> => {
    const student = await studentRepo.findById(id);
    if (!student) throw new Error("Student not found");

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    const sample = {
      studentId: student.id,
      name: `${student.firstName} ${student.lastName}`,
    };

    return studentRepo.createParentToken({
      student: sample,
      token,
      expiresAt,
    });
  };

  getActiveParentTokens = async (id: string): Promise<IParentTokenDoc[]> => {
    return studentRepo.findActiveParentTokens(id);
  };

  deleteParentToken = async (tokenId: string): Promise<DeleteResult | null> => {
    return studentRepo.deleteParentToken(tokenId);
  };
}

export const studentService = new StudentService();
