import { CreateStudentDTO, UpdateStudentDTO } from "@axon/types";
import { IStudentDoc } from "./student.model.js";
import { classService } from "@v1/class/class.service.js";
import { studentRepo } from "./student.repo.js";
import { classRepo } from "@v1/class/class.repo.js";

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
    if (deleted) classRepo.removeStudent(deleted.class.toString());

    return deleted;
  };

  listStudents = async (): Promise<IStudentDoc[]> => {
    return studentRepo.list();
  };
}

export const studentService = new StudentService();
