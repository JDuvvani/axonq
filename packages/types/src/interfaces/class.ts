import { WithTimestamps } from "../utils.js";

export interface IClass extends WithTimestamps {
  id: string;
  name: string;
  teacher: string;
  studentCount: number;
}
