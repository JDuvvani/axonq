import { output } from "zod";
import { createClassSchema, updateClassSchema } from "./class.schema.js";

export type CreateClassDTO = output<typeof createClassSchema>["body"];

export type UpdateClassDTO = output<typeof updateClassSchema>["body"];
