import { CreateClassMemberDTO, UpdateClassMemberDTO } from "@axon/types";
import { IClassMemberDoc, ClassMember } from "./class-member.model.js";
import { DeleteResult, UpdateResult } from "mongoose";
import { IConnectTokenDoc, ConnectToken } from "./connectToken.model.js";
import { ConnectSample, ClassMemberSample } from "@types";

export type ConnectTokenData = {
  token: string;
  classMember: ClassMemberSample;
  expiresAt: Date;
};

class ClassMemberRepo {
  create = async (data: CreateClassMemberDTO): Promise<IClassMemberDoc> => {
    return ClassMember.create(data);
  };

  findById = async (id: string): Promise<IClassMemberDoc | null> => {
    return ClassMember.findById(id).exec();
  };

  findByClass = async (classId: string): Promise<IClassMemberDoc[]> => {
    return ClassMember.find({ classId }).exec();
  };

  update = async (
    id: string,
    data: UpdateClassMemberDTO
  ): Promise<IClassMemberDoc | null> => {
    return ClassMember.findByIdAndUpdate(id, data, { new: true }).exec();
  };

  delete = async (id: string): Promise<IClassMemberDoc | null> => {
    return ClassMember.findByIdAndDelete(id).exec();
  };

  deleteByClass = async (classId: string): Promise<DeleteResult> => {
    return ClassMember.deleteMany({ classId }).exec();
  };

  deleteByClasses = async (classIds: string[]): Promise<DeleteResult> => {
    return ClassMember.deleteMany({ classId: { $in: classIds } }).exec();
  };

  list = async (): Promise<IClassMemberDoc[]> => {
    return ClassMember.find();
  };

  addConnect = async (
    id: string,
    data: ConnectSample
  ): Promise<IClassMemberDoc | null> => {
    return ClassMember.findByIdAndUpdate(
      id,
      { $addToSet: { connects: data } },
      { new: true }
    );
  };

  removeConnectFromAll = async (connectId: string): Promise<UpdateResult> => {
    return ClassMember.updateMany(
      { "connects.connectId": connectId },
      { $pull: { connects: { connectId: connectId } } }
    ).exec();
  };

  // Parent - Token

  createConnectToken = async (
    data: ConnectTokenData
  ): Promise<IConnectTokenDoc> => {
    return ConnectToken.create({ ...data });
  };

  findConnectToken = async (
    token: string
  ): Promise<IConnectTokenDoc | null> => {
    return ConnectToken.findOne({ token });
  };

  findActiveConnectTokens = async (id: string): Promise<IConnectTokenDoc[]> => {
    return ConnectToken.find({
      "classMember.classMemberId": id,
      expiresAt: { $gt: new Date() },
      used: false,
    });
  };

  useToken = async (tokenId: string): Promise<IConnectTokenDoc | null> => {
    return ConnectToken.findByIdAndUpdate(tokenId, {
      used: true,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });
  };

  deleteConnectToken = async (
    tokenId: string
  ): Promise<DeleteResult | null> => {
    return ConnectToken.findByIdAndDelete(tokenId);
  };

  deleteTokens = async (id: string): Promise<DeleteResult> => {
    return ConnectToken.deleteMany({ "classMember.classMemberId": id });
  };

  deleteAllTokens = async (classMemberIds: string[]): Promise<DeleteResult> => {
    return ConnectToken.deleteMany({
      "classMember.classMemberId": { $in: classMemberIds },
    });
  };
}

export const classMemberRepo = new ClassMemberRepo();
