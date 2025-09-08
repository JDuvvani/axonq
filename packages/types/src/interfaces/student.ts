import { WithTimestamps } from "../utils.js";

export interface IStudent extends WithTimestamps {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  class: string;
  parents: {
    parentId: string;
    name: string;
    imageUrl: string;
  }[];
}

export interface IParentToken {
  id: string;
  token: string;
  student: { studentId: string; name: string };
  expiresAt: string;
  used: boolean;
  createdAt: string;
}
