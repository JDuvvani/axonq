import { AddClassMemberDTO, CreateUserDTO, UpdateUserDTO } from "@axon/types";
import { userRepo } from "./user.repo.js";
import { IUserDoc } from "./user.model.js";
import { classMemberRepo } from "@v1/class-member/class-member.repo.js";
import { omit } from "lodash";
import { classService } from "@v1/class/class.service.js";
import { classMemberService } from "@v1/class-member/class-member.service.js";
import { CreateUser, ConnectSample } from "@types";

class UserService {
  createUser = async (data: CreateUserDTO): Promise<IUserDoc> => {
    let token;

    if (data.token) {
      token = await classMemberRepo.findConnectToken(data.token);
      if (!token || token.used) throw new Error("Invalid token");
      if (token.expiresAt < new Date()) throw new Error("Token expired");
    }

    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new Error("Email already in use");

    const input: CreateUser = { ...omit(data, ["token"]), role: "ADMIN" };

    if (token) {
      const data = { ...input, role: "CONNECT" };
      const connect = await userRepo.createConnect(data, token.classMember);

      const sample: ConnectSample = {
        connectId: connect.id,
        name: connect.name,
        imageUrl: connect.imageUrl,
      };

      classMemberService.addConnect(
        token.classMember.classMemberId.toString(),
        sample
      );
      classMemberRepo.useToken(token.id);

      return connect;
    }

    return userRepo.create(input);
  };

  addConnection = async (
    id: string,
    input: AddClassMemberDTO
  ): Promise<IUserDoc | null> => {
    const [token, user] = await Promise.all([
      classMemberRepo.findConnectToken(input.token),
      userRepo.findById(id),
    ]);
    if (!token || token.used) throw new Error("Invalid token");
    if (token.expiresAt < new Date()) throw new Error("Token expired");
    if (!user) throw new Error("Connect not found");

    const sample: ConnectSample = {
      connectId: user.id,
      name: user.name,
      imageUrl: user.imageUrl,
    };
    classMemberService.addConnect(
      token.classMember.classMemberId.toString(),
      sample
    );
    classMemberRepo.useToken(token.id);

    const parent = await userRepo.addClassMember(id, token.classMember);

    return parent;
  };

  getUserById = async (id: string): Promise<IUserDoc | null> => {
    return userRepo.findById(id);
  };

  getUserByEmail = async (email: string): Promise<IUserDoc | null> => {
    return userRepo.findByEmail(email);
  };

  getUserByClerkId = async (clerkId: string): Promise<IUserDoc | null> => {
    return userRepo.findByClerkId(clerkId);
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
    if (user.role === "CONNECT")
      await classMemberService.removeConnectFromAll(id);

    await classService.deleteByOwner(id);

    return userRepo.delete(id);
  };

  listUsers = async (): Promise<IUserDoc[]> => {
    return userRepo.list();
  };
}

export const userService = new UserService();
