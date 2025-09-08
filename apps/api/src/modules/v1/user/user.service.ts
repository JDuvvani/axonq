import {
  AddChildDTO,
  CreateParentDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from "@axon/types";
import { userRepo } from "./user.repo.js";
import { IUserDoc } from "./user.model.js";
import { studentRepo } from "@v1/student/student.repo.js";
import { omit } from "lodash";
import { classService } from "@v1/class/class.service.js";
import { studentService } from "@v1/student/student.service.js";
import { ParentSample } from "@types";

class UserService {
  createUser = async (data: CreateUserDTO): Promise<IUserDoc> => {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error("Email already in use");

    return userRepo.create(data);
  };

  createParent = async (input: CreateParentDTO): Promise<IUserDoc> => {
    const token = await studentRepo.findParentToken(input.token);
    if (!token || token.used) throw new Error("Invalid token");
    if (token.expiresAt < new Date()) throw new Error("Token expired");

    const existing = await userRepo.findByEmail(input.email);
    if (existing) throw new Error("Email already in use");

    const data: CreateUserDTO = { ...omit(input, ["token"]), role: "PARENT" };

    const parent = await userRepo.createParent(data, token.student);
    const sample: ParentSample = {
      parentId: parent.id,
      name: parent.name,
      imageUrl: parent.imageUrl,
    };
    studentService.addParent(token.student.studentId.toString(), sample);
    studentRepo.useToken(token.id);

    return parent;
  };

  addChild = async (
    id: string,
    input: AddChildDTO
  ): Promise<IUserDoc | null> => {
    const [token, user] = await Promise.all([
      studentRepo.findParentToken(input.token),
      userRepo.findById(id),
    ]);
    if (!token || token.used) throw new Error("Invalid token");
    if (token.expiresAt < new Date()) throw new Error("Token expired");
    if (!user) throw new Error("Parent not found");

    const sample: ParentSample = {
      parentId: user.id,
      name: user.name,
      imageUrl: user.imageUrl,
    };
    studentService.addParent(token.student.studentId.toString(), sample);
    studentRepo.useToken(token.id);

    const parent = await userRepo.addChild(id, token.student);

    return parent;
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
    const user = await userRepo.findById(id);
    if (!user) throw new Error("User not found");
    if (user.role === "PARENT") await studentService.removeParentFromAll(id);

    await classService.deleteByTeacher(id);

    return userRepo.delete(id);
  };

  listUsers = async (): Promise<IUserDoc[]> => {
    return userRepo.list();
  };
}

export const userService = new UserService();
