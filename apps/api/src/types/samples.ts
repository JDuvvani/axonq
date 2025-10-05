import { Types } from "mongoose";

export type ClassSample = {
  classId: Types.ObjectId;
  name: string;
};

export type ClassMemberSample = {
  classMemberId: Types.ObjectId;
  name: string;
};

export type ConnectSample = {
  connectId: Types.ObjectId;
  name: string;
  imageUrl: string;
};
