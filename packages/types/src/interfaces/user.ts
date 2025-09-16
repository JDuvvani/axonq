import { UserRole } from "../enums.js";
import { WithTimestamps } from "../utils.js";

export interface IUser extends WithTimestamps {
  id: string;
  name: string;
  email: string;
  clerkId: string;
  role: UserRole;
  imageUrl: string;
  phone?: string;
  classes: {
    id: string;
    name: string;
  }[];
  classCount: number;
  children: {
    studentId: string;
    name: string;
  }[];
}
