import { CreateClassMemberDTO, UpdateClassMemberDTO } from "@axon/types";
import { IClassMemberDoc } from "./class-member.model.js";
import { classService } from "@v1/class/class.service.js";
import { classMemberRepo } from "./class-member.repo.js";
import { classRepo } from "@v1/class/class.repo.js";
import { IConnectTokenDoc } from "./connectToken.model.js";
import { DeleteResult, UpdateResult } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ClassMemberSample, ConnectSample } from "@types";

class ClassMemberService {
  createMember = async (
    data: CreateClassMemberDTO
  ): Promise<IClassMemberDoc> => {
    const result = await classService.getClassById(data.classId);
    if (!result) throw new Error("Class not found");

    const member = await classMemberRepo.create(data);
    classRepo.addMember(data.classId);

    return member;
  };

  getMemberById = async (id: string): Promise<IClassMemberDoc | null> => {
    return classMemberRepo.findById(id);
  };

  getMembersByClass = async (classId: string): Promise<IClassMemberDoc[]> => {
    return classMemberRepo.findByClass(classId);
  };

  updateMember = async (
    id: string,
    data: UpdateClassMemberDTO
  ): Promise<IClassMemberDoc | null> => {
    return classMemberRepo.update(id, data);
  };

  deleteMember = async (id: string): Promise<IClassMemberDoc | null> => {
    const deleted = await classMemberRepo.delete(id);
    if (deleted) {
      Promise.all([
        classRepo.removeMember(deleted.classId.toString()),
        classMemberRepo.deleteTokens(id),
      ]);
    }

    return deleted;
  };

  deleteByClass = async (classId: string): Promise<DeleteResult> => {
    const members = await classMemberRepo.findByClass(classId);
    const classMemberIds = members.map((s) => s.id.toString());

    await classMemberRepo.deleteAllTokens(classMemberIds);

    return await classMemberRepo.deleteByClass(classId);
  };

  deleteByClasses = async (classIds: string[]): Promise<DeleteResult> => {
    const deleted = await classMemberRepo.deleteByClasses(classIds);

    return deleted;
  };

  listMembers = async (): Promise<IClassMemberDoc[]> => {
    return classMemberRepo.list();
  };

  addConnect = async (
    id: string,
    data: ConnectSample
  ): Promise<IClassMemberDoc | null> => {
    return classMemberRepo.addConnect(id, data);
  };

  removeConnectFromAll = async (connectId: string): Promise<UpdateResult> => {
    return classMemberRepo.removeConnectFromAll(connectId);
  };

  // Connect Token

  generateConnectToken = async (
    id: string,
    ttlHours = 48
  ): Promise<IConnectTokenDoc> => {
    const classMember = await classMemberRepo.findById(id);
    if (!classMember) throw new Error("Class Member not found");

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    const sample: ClassMemberSample = {
      classMemberId: classMember.id,
      name: `${classMember.firstName} ${classMember.lastName}`,
    };

    return classMemberRepo.createConnectToken({
      classMember: sample,
      token,
      expiresAt,
    });
  };

  getActiveConnectTokens = async (id: string): Promise<IConnectTokenDoc[]> => {
    return classMemberRepo.findActiveConnectTokens(id);
  };

  deleteConnectToken = async (
    tokenId: string
  ): Promise<DeleteResult | null> => {
    return classMemberRepo.deleteConnectToken(tokenId);
  };
}

export const classMemberService = new ClassMemberService();
