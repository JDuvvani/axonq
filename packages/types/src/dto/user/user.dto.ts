import { output } from "zod";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "./user.schema.js";

export type CreateUserDTO = output<typeof createUserSchema>["body"];

export type UserIdDTO = output<typeof getUserByIdSchema>["params"];

export type UpdateUserDTO = output<typeof updateUserSchema>["body"];
