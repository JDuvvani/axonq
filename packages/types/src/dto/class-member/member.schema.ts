import { int, object, string, url } from "zod";
import { idParamsSchema, objectIdString } from "../common.js";

export const createClassMemberSchema = object({
  body: object({
    firstName: string().min(2),
    lastName: string().min(2),
    classId: objectIdString,
  }),
});

export const getClassMemberByIdSchema = object({
  params: idParamsSchema,
});

export const updateClassMemberSchema = object({
  params: idParamsSchema,
  body: object({
    firstName: string().min(2).optional(),
    lastName: string().min(2).optional(),
    imageUrl: url().optional(),
  }),
});

export const deleteStudentSchema = getClassMemberByIdSchema;

export const generateConnectTokenSchema = object({
  params: idParamsSchema,
  body: object({
    ttlHours: int()
      .min(1, "Time must at least be 1 hour")
      .max(120, "Time cannot be more than 120 hours"),
  }).optional(),
});

export const getConnectTokensSchema = object({
  params: idParamsSchema,
});

export const deleteConnectTokenSchema = object({
  params: object({
    id: objectIdString,
    tokenId: objectIdString,
  }),
});
