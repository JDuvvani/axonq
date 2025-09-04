import { Document, model, Schema, Types } from "mongoose";
import { IUser } from "@axon/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "classes", "createdAt", "updatedAt"] as const;
type omits = (typeof omitList)[number];

export type ClassSample = {
  classId: Types.ObjectId;
  name: string;
};

export interface IUserDoc extends Omit<IUser, omits>, Document {
  classes: ClassSample[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["TEACHER", "PARENT", "ADMIN"],
      required: true,
    },
    phone: { type: String },
    classes: [
      {
        classId: { type: Schema.Types.ObjectId, ref: "Class", require: true },
        name: { type: String, required: true, trim: true },
      },
    ],
    classCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUserDoc>("User", userSchema);
