import { output } from "zod";
import {
  addChildSchema,
  createParentSchema,
  createUserSchema,
  updateUserSchema,
} from "./user.schema.js";

export type CreateUserDTO = output<typeof createUserSchema>["body"];

export type CreateParentDTO = output<typeof createParentSchema>["body"];

export type UpdateUserDTO = output<typeof updateUserSchema>["body"];

export type AddChildDTO = output<typeof addChildSchema>["body"];
