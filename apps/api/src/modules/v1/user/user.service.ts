import { CreateUserDTO, UpdateUserDTO } from "@axon/types";
import { userRepo } from "./user.repo.js";
import { IUserDoc } from "./user.model.js";

class UserService {
  createUser = async (data: CreateUserDTO): Promise<IUserDoc> => {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error("Email already in use");

    return userRepo.create(data);
  };

  getUserById = async (id: string): Promise<IUserDoc | null> => {
    return userRepo.findById(id);
  };

  getUserByEmail = async (email: string): Promise<IUserDoc | null> => {
    return userRepo.findByEmail(email);
  };

  updateUser = async (
    id: string,
    data: UpdateUserDTO
  ): Promise<IUserDoc | null> => {
    return userRepo.update(id, data);
  };

  deleteUser = async (id: string): Promise<IUserDoc | null> => {
    return userRepo.delete(id);
  };

  listUsers = async (): Promise<IUserDoc[]> => {
    return userRepo.list();
  };
}

export const userService = new UserService();
