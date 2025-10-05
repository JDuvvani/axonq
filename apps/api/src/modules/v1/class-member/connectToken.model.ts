import { IConnectToken } from "@axon/types";
import { ClassMemberSample } from "@types";
import { Document, model, Schema } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const omitList = ["id", "classMember", "expiresAt", "createdAt"] as const;
type omits = (typeof omitList)[number];

export interface IConnectTokenDoc extends Omit<IConnectToken, omits>, Document {
  classMember: ClassMemberSample;
  expiresAt: Date;
  createdAt: Date;
}

const connectTokenSchema = new Schema<IConnectTokenDoc>(
  {
    token: { type: String, required: true, unique: true },
    classMember: {
      classMemberId: {
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

connectTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const ConnectToken = model<IConnectTokenDoc>(
  "ParentToken",
  connectTokenSchema
);
