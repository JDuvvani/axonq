import { IParentToken } from "@axon/types";
import { Document, model, Schema, Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "student", "expiresAt", "createdAt"] as const;
type omits = (typeof omitList)[number];

export interface IParentTokenDoc extends Omit<IParentToken, omits>, Document {
  student: { studentId: Types.ObjectId; name: string };
  expiresAt: Date;
  createdAt: Date;
}

const parentTokenSchema = new Schema<IParentTokenDoc>(
  {
    token: { type: String, required: true, unique: true },
    student: {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      name: { type: String, require: true },
    },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

parentTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const ParentToken = model<IParentTokenDoc>(
  "ParentToken",
  parentTokenSchema
);
