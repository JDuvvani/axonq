import { CreateUserDTO } from "@axon/types";
import { ClassSample, IUserDoc, User } from "./user.model.js";
import { Types } from "mongoose";
import { Class } from "@v1/class/class.model.js";

class UserRepo {
  create = async (data: CreateUserDTO): Promise<IUserDoc> => {
    const user = await User.create(data);
    return user;
  };

  findById = async (id: string): Promise<IUserDoc | null> => {
    return User.findById(id).exec();
  };

  findByEmail = async (email: string): Promise<IUserDoc | null> => {
    return User.findOne({ email }).exec();
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
    await Class.deleteMany({ teacher: id });
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
}

export const userRepo = new UserRepo();
