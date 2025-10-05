import { email, object, string, url, uuid } from "zod";
import { idParamsSchema } from "../common.js";

export const createUserSchema = object({
  body: object({
    name: string().min(2),
    email: email(),
    clerkId: string(),
    imageUrl: url().optional(),
    phone: string().optional(),
    token: uuid().optional(),
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
    imageUrl: url().optional(),
    phone: string().optional().optional(),
  }),
}).refine((d) => d.body && Object.keys(d.body).length > 0, {
  error: "No fields to update",
  path: ["body"],
});

export const addClassMemberSchema = object({
  params: idParamsSchema,
  body: object({
    token: uuid(),
  }),
});
