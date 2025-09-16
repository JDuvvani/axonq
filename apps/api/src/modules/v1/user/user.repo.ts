import { CreateUserDTO } from "@axon/types";
import { IUserDoc, User } from "./user.model.js";
import { Types } from "mongoose";
import { ClassSample, CreateUser, StudentSample } from "@types";

class UserRepo {
  create = async (data: CreateUser): Promise<IUserDoc> => {
    const user = await User.create(data);
    return user;
  };

  createParent = async (
    data: CreateUserDTO,
    student: StudentSample
  ): Promise<IUserDoc> => {
    const user = await User.create({ ...data, children: [student] });
    return user;
  };

  findById = async (id: string): Promise<IUserDoc | null> => {
    return User.findById(id).exec();
  };

  findByEmail = async (email: string): Promise<IUserDoc | null> => {
    return User.findOne({ email }).exec();
  };

  findByClerkId = async (clerkId: string): Promise<IUserDoc | null> => {
    return User.findOne({ clerkId }).exec();
  };

  findByRole = async (role: IUserDoc["role"]): Promise<IUserDoc[]> => {
    return User.find({ role }).exec();
  };

  update = async (
    id: string,
    data: Partial<IUserDoc>
  ): Promise<IUserDoc | null> => {
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
  };

  delete = async (id: string): Promise<IUserDoc | null> => {
    return User.findByIdAndDelete(id).exec();
  };

  list = async (): Promise<IUserDoc[]> => {
    return User.find().exec();
  };

  addClass = async (id: Types.ObjectId, sample: ClassSample): Promise<void> => {
    await User.findByIdAndUpdate(id, {
      $addToSet: { classes: sample },
      $inc: { classCount: 1 },
    }).exec();
  };

  removeClass = async (
    id: Types.ObjectId,
    classId: Types.ObjectId
  ): Promise<void> => {
    await User.findByIdAndUpdate(id, {
      $pull: { classes: { classId } },
      $inc: { classCount: -1 },
    }).exec();
  };

  addChild = async (
    id: string,
    sample: StudentSample
  ): Promise<IUserDoc | null> => {
    return User.findByIdAndUpdate(
      id,
      { $addToSet: { children: sample } },
      { new: true }
    ).exec();
  };
}

export const userRepo = new UserRepo();
