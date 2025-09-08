import { CreateStudentDTO, UpdateStudentDTO } from "@axon/types";
import { IStudentDoc, Student } from "./student.model.js";
import { DeleteResult, UpdateResult } from "mongoose";
import { IParentTokenDoc, ParentToken } from "./parentToken.model.js";
import { ParentSample, StudentSample } from "@types";

export type ParentTokenData = {
  token: string;
  student: StudentSample;
  expiresAt: Date;
};

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

  deleteByClasses = async (classIds: string[]): Promise<DeleteResult> => {
    return Student.deleteMany({ class: { $in: classIds } }).exec();
  };

  list = async (): Promise<IStudentDoc[]> => {
    return Student.find();
  };

  addParent = async (
    id: string,
    data: ParentSample
  ): Promise<IStudentDoc | null> => {
    return Student.findByIdAndUpdate(
      id,
      { $addToSet: { parents: data } },
      { new: true }
    );
  };

  removeParentFromAll = async (parentId: string): Promise<UpdateResult> => {
    return Student.updateMany(
      { "parents.parentId": parentId },
      { $pull: { parents: { parentId: parentId } } }
    ).exec();
  };

  // Parent - Token

  createParentToken = async (
    data: ParentTokenData
  ): Promise<IParentTokenDoc> => {
    return ParentToken.create({ ...data });
  };

  findParentToken = async (token: string): Promise<IParentTokenDoc | null> => {
    return ParentToken.findOne({ token });
  };

  findActiveParentTokens = async (id: string): Promise<IParentTokenDoc[]> => {
    return ParentToken.find({
      "student.studentId": id,
      expiresAt: { $gt: new Date() },
      used: false,
    });
  };

  useToken = async (tokenId: string): Promise<IParentTokenDoc | null> => {
    return ParentToken.findByIdAndUpdate(tokenId, {
      used: true,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });
  };

  deleteParentToken = async (tokenId: string): Promise<DeleteResult | null> => {
    return ParentToken.findByIdAndDelete(tokenId);
  };

  deleteTokens = async (id: string): Promise<DeleteResult> => {
    return ParentToken.deleteMany({ "student.studentId": id });
  };

  deleteAllTokens = async (studentIds: string[]): Promise<DeleteResult> => {
    return ParentToken.deleteMany({ "student.studentId": { $in: studentIds } });
  };
}

export const studentRepo = new StudentRepo();
