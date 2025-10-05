import { IClass } from "@axon/types";
import { Document, model, Schema, Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "ownerId", "createdAt", "updatedAt"] as const;
type omits = (typeof omitList)[number];

export interface IClassDoc extends Omit<IClass, omits>, Document {
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClassDoc>(
  {
    name: { type: String, required: true, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    memberCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

classSchema.index({ ownerId: 1, name: 1 }, { unique: true });

export const Class = model<IClassDoc>("Class", classSchema);
