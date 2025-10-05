import { output } from "zod";
import {
  addClassMemberSchema,
  createUserSchema,
  updateUserSchema,
} from "./user.schema.js";

export type CreateUserDTO = output<typeof createUserSchema>["body"];

export type UpdateUserDTO = output<typeof updateUserSchema>["body"];

export type AddClassMemberDTO = output<typeof addClassMemberSchema>["body"];
