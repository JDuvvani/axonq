import { IMessage } from "@axon/types";
import { Document, model, Schema, Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "senderId", "recipientId", "classId"] as const;
type omits = (typeof omitList)[number];

export interface IMessageDoc extends Omit<IMessage, omits>, Document {
  senderId: Types.ObjectId;
  recipientId: Types.ObjectId;
  classId: Types.ObjectId;
}

const messageSchema = new Schema<IMessageDoc>(
  {
    senderId: { type: Schema.Types.ObjectId, required: true },
    recipientId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    classId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessageDoc>("Message", messageSchema);
