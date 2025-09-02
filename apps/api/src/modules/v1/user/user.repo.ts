import { CreateUserDTO, IUser } from "@axon/types";
import { User } from "./user.model.js";

class UserRepo {
  create = async (data: CreateUserDTO): Promise<IUser> => {
    const user = await User.create(data);
    return user;
  };

  findById = async (id: string): Promise<IUser | null> => {
    return User.findById(id).exec();
  };

  findByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email }).exec();
  };

  findByRole = async (role: IUser["role"]): Promise<IUser[]> => {
    return User.find({ role }).exec();
  };

  update = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
  };

  delete = async (id: string): Promise<IUser | null> => {
    return User.findByIdAndDelete(id).exec();
  };

  list = async (): Promise<IUser[]> => {
    return User.find().exec();
  };
}

export const userRepo = new UserRepo();
