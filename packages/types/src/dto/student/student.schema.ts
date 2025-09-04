import { object, string, url } from "zod";
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
