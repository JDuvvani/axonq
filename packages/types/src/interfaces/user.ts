import { UserRole } from "../enums.js";
import { WithTimestamps } from "../utils.js";

export interface IUser extends WithTimestamps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}
