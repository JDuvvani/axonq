import { output } from "zod";
import {
  createClassMemberSchema,
  updateClassMemberSchema,
} from "./member.schema.js";
import { generateConnectTokenSchema } from "./member.schema.js";

export type CreateClassMemberDTO = output<
  typeof createClassMemberSchema
>["body"];

export type UpdateClassMemberDTO = output<
  typeof updateClassMemberSchema
>["body"];

export type GenerateConnectTokenDTO = output<
  typeof generateConnectTokenSchema
>["body"];
