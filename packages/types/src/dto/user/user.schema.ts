import { z, email, object, string } from "zod";
import { UserRoles } from "../../enums.js";
import { idParamsSchema } from "../common.js";

export const createUserSchema = object({
  body: object({
    name: string().min(2),
    email: email(),
    role: z.enum(UserRoles),
    phone: string().optional(),
  }),
});

export const getUserByIdSchema = object({
  params: idParamsSchema,
});

export const updateUserSchema = object({
  params: idParamsSchema,
  body: object({
    name: string().min(2).optional(),
    email: email().optional(),
    phone: string().optional().optional(),
  }),
}).refine((d) => d.body && Object.keys(d.body).length > 0, {
  error: "No fields to update",
  path: ["body"],
});
