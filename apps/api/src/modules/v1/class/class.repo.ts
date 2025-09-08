import { CreateClassDTO, UpdateClassDTO } from "@axon/types";
import { Class, IClassDoc } from "./class.model.js";
import { DeleteResult } from "mongoose";

class ClassRepo {
  create = async (data: CreateClassDTO): Promise<IClassDoc> => {
    const newClass = await Class.create(data);
    return newClass.toJSON();
  };

  findById = async (id: string): Promise<IClassDoc | null> => {
    return (await Class.findById(id).exec())?.toJSON() ?? null;
  };

  findByTeacher = async (teacherId: string): Promise<IClassDoc[]> => {
    return await Class.find({ teacher: teacherId }).select("id");
  };

  update = async (
    id: string,
    data: UpdateClassDTO
  ): Promise<IClassDoc | null> => {
    const updated = await Class.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    return updated?.toJSON() ?? null;
  };

  delete = async (id: string): Promise<IClassDoc | null> => {
    return (await Class.findByIdAndDelete(id).exec())?.toJSON() ?? null;
  };

  deleteByTeacher = async (teacherId: string): Promise<DeleteResult> => {
    return Class.deleteMany({ teacher: teacherId });
  };

  addStudent = async (id: string): Promise<IClassDoc | null> => {
    return Class.findByIdAndUpdate(id, { $inc: { studentCount: 1 } }).exec();
  };

  removeStudent = async (id: string): Promise<IClassDoc | null> => {
    return Class.findByIdAndUpdate(id, { $inc: { studentCount: -1 } }).exec();
  };

  list = async (): Promise<IClassDoc[]> => {
    return Class.find().exec();
  };
}

export const classRepo = new ClassRepo();
