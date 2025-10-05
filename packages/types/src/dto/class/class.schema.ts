import { object, string } from "zod";
import { idParamsSchema, objectIdString } from "../common.js";

export const createClassSchema = object({
  body: object({
    name: string().min(2),
    ownerId: objectIdString,
  }),
});

export const getClassByIdSchema = object({
  params: idParamsSchema,
});

export const updateClassSchema = object({
  params: idParamsSchema,
  body: object({
    name: string().min(2).optional(),
    ownerId: objectIdString.optional(),
  }),
}).refine((d) => d.body && Object.keys(d.body).length > 0, {
  error: "No fields to update",
  path: ["body"],
});

export const deleteClassSchema = getClassByIdSchema;
