import { output } from "zod";
import { createUserSchema, updateUserSchema } from "./user.schema.js";

export type CreateUserDTO = output<typeof createUserSchema>["body"];

export type UpdateUserDTO = output<typeof updateUserSchema>["body"];
