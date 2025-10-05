import { UserRole } from "../enums.js";
import { WithTimestamps } from "../utils.js";

export interface IClassMember extends WithTimestamps {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  role: UserRole;
  classId: string;
  connects: {
    connectId: string;
    name: string;
    imageUrl: string;
  }[];
}

export interface IConnectToken {
  id: string;
  token: string;
  classMember: { classMemberId: string; name: string };
  expiresAt: string;
  used: boolean;
  createdAt: string;
}
