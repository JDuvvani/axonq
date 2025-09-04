import { CreateStudentDTO, UpdateStudentDTO } from "@axon/types";
import { IStudentDoc, Student } from "./student.model.js";
import { DeleteResult } from "mongoose";

class StudentRepo {
  create = async (data: CreateStudentDTO): Promise<IStudentDoc> => {
    return Student.create(data);
  };

  findById = async (id: string): Promise<IStudentDoc | null> => {
    return Student.findById(id).exec();
  };

  findByClass = async (classId: string): Promise<IStudentDoc[]> => {
    return Student.find({ class: classId }).exec();
  };

  update = async (
    id: string,
    data: UpdateStudentDTO
  ): Promise<IStudentDoc | null> => {
    return Student.findByIdAndUpdate(id, data, { new: true }).exec();
  };

  delete = async (id: string): Promise<IStudentDoc | null> => {
    return Student.findByIdAndDelete(id).exec();
  };

  deleteByClass = async (classId: string): Promise<DeleteResult> => {
    return Student.deleteMany({ class: classId }).exec();
  };

  list = async (): Promise<IStudentDoc[]> => {
    return Student.find();
  };
}

export const studentRepo = new StudentRepo();
