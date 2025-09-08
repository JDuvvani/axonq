import { IStudent } from "@axon/types";
import { Document, model, Schema, Types } from "mongoose";
import { ParentSample } from "@types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "class", "parents", "createdAt", "updatedAt"] as const;
type omits = (typeof omitList)[number];

export interface IStudentDoc extends Omit<IStudent, omits>, Document {
  id: Types.ObjectId;
  class: Types.ObjectId;
  parents: ParentSample[];
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudentDoc>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    parents: [
      {
        parentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true, trim: true },
        imageUrl: { type: String },
      },
    ],
  },
  { timestamps: true }
);

studentSchema.index({ class: 1 });

export const Student = model<IStudentDoc>("Student", studentSchema);
