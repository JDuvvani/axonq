import { output } from "zod";
import { createStudentSchema, updateStudentSchema } from "./student.schema.js";
import { generateParentTokenSchema } from "./student.schema.js";

export type CreateStudentDTO = output<typeof createStudentSchema>["body"];

export type UpdateStudentDTO = output<typeof updateStudentSchema>["body"];

export type GenerateParentTokenDTO = output<
  typeof generateParentTokenSchema
>["body"];
