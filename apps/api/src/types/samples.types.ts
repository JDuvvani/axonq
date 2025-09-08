import { Types } from "mongoose";

export type ClassSample = {
  classId: Types.ObjectId;
  name: string;
};

export type StudentSample = {
  studentId: Types.ObjectId;
  name: string;
};

export type ParentSample = {
  parentId: Types.ObjectId;
  name: string;
  imageUrl: string;
};
