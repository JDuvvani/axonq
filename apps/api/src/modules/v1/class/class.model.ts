import { IClass } from "@axon/types";
import { Document, model, Schema, Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "teacher", "createdAt", "updatedAt"] as const;
type omits = (typeof omitList)[number];

export interface IClassDoc extends Omit<IClass, omits>, Document {
  teacher: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClassDoc>(
  {
    name: { type: String, required: true, trim: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

classSchema.index({ teacherId: 1, name: 1 }, { unique: true });

export const Class = model<IClassDoc>("Class", classSchema);
