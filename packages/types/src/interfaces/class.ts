import { WithTimestamps } from "../utils.js";

export interface IClass extends WithTimestamps {
  id: string;
  name: string;
  ownerId: string;
  memberCount: number;
}
