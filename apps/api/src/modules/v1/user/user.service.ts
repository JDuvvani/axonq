import { CreateUserDTO, IUser, UpdateUserDTO } from "@axon/types";
import { userRepo } from "./user.repo.js";

class UserService {
  createUser = async (data: CreateUserDTO): Promise<IUser> => {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error("Email already in use");

    return userRepo.create(data);
  };

  getUserById = async (id: string): Promise<IUser | null> => {
    return userRepo.findById(id);
  };

  getUserByEmail = async (email: string): Promise<IUser | null> => {
    return userRepo.findByEmail(email);
  };

  updateUser = async (
    id: string,
    data: UpdateUserDTO
  ): Promise<IUser | null> => {
    return userRepo.update(id, data);
  };

  deleteUser = async (id: string): Promise<IUser | null> => {
    return userRepo.delete(id);
  };

  listUsers = async (): Promise<IUser[]> => {
    return userRepo.list();
  };
}

export const userService = new UserService();
