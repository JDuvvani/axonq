import { Document, model, Schema } from "mongoose";
import { IUser } from "@axon/types";

export type IUserDoc = IUser & Document;

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: {
      type: String,
      enum: ["TEACHER", "PARENT", "ADMIN"],
      required: true,
    },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUserDoc>("User", userSchema);
