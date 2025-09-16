import { output } from "zod";
import {
  addChildSchema,
  createUserSchema,
  getUserByClerkIdSchema,
  updateUserSchema,
} from "./user.schema.js";

export type CreateUserDTO = output<typeof createUserSchema>["body"];

export type GetUserByClerkIdDTO = output<typeof getUserByClerkIdSchema>["body"];

export type UpdateUserDTO = output<typeof updateUserSchema>["body"];

export type AddChildDTO = output<typeof addChildSchema>["body"];
