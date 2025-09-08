import { int, object, string, url } from "zod";
import { idParamsSchema, objectIdString } from "../common.js";

export const createStudentSchema = object({
  body: object({
    firstName: string().min(2),
    lastName: string().min(2),
    class: objectIdString,
  }),
});

export const getStudentByIdSchema = object({
  params: idParamsSchema,
});

export const updateStudentSchema = object({
  params: idParamsSchema,
  body: object({
    firstName: string().min(2).optional(),
    lastName: string().min(2).optional(),
    imageUrl: url().optional(),
  }),
});

export const deleteStudentSchema = getStudentByIdSchema;

export const generateParentTokenSchema = object({
  params: idParamsSchema,
  body: object({
    ttlHours: int()
      .min(1, "Time must at least be 1 hour")
      .max(120, "Time cannot be more than 120 hours"),
  }).optional(),
});

export const getParentTokensSchema = object({
  params: idParamsSchema,
});

export const deleteParentTokenSchema = object({
  params: object({
    id: objectIdString,
    tokenId: objectIdString,
  }),
});
