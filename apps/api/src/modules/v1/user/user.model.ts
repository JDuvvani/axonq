import { Document, model, Schema } from "mongoose";
import { IUser } from "@axon/types";
import { ClassSample, ClassMemberSample } from "@types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = [
  "id",
  "classes",
  "connections",
  "createdAt",
  "updatedAt",
] as const;
type omits = (typeof omitList)[number];

export interface IUserDoc extends Omit<IUser, omits>, Document {
  classes: ClassSample[];
  connections: ClassMemberSample[];
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
    },
    clerkId: { type: String, required: true, unique: true, index: true },
    role: {
      type: String,
      enum: ["ADMIN", "CONNECT"],
      required: true,
    },
    imageUrl: { type: String },
    phone: { type: String },
    classes: [
      {
        classId: { type: Schema.Types.ObjectId, ref: "Class", require: true },
        name: { type: String, required: true, trim: true },
      },
    ],
    connections: [
      {
        classMemberId: {
          type: Schema.Types.ObjectId,
          ref: "ClassMember",
          require: true,
        },
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
