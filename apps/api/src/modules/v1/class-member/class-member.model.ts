import { IClassMember } from "@axon/types";
import { Document, model, Schema, Types } from "mongoose";
import { ConnectSample } from "@types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = [
  "id",
  "classId",
  "connects",
  "createdAt",
  "updatedAt",
] as const;
type omits = (typeof omitList)[number];

export interface IClassMemberDoc extends Omit<IClassMember, omits>, Document {
  id: Types.ObjectId;
  classId: Types.ObjectId;
  connects: ConnectSample[];
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IClassMemberDoc>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    connects: [
      {
        connectId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true, trim: true },
        imageUrl: { type: String },
      },
    ],
  },
  { timestamps: true }
);

studentSchema.index({ class: 1 });

export const ClassMember = model<IClassMemberDoc>("Student", studentSchema);
