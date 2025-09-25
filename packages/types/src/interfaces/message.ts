import { WithTimestamps } from "../utils.js";

export interface IMessage extends WithTimestamps {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  classId: string;
}
