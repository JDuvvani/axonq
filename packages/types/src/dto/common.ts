import { object, output, string } from "zod";

export const objectIdString = string().regex(
  /^[0-9a-fA-F]{24}$/,
  "Invalid ObjectId"
);

export const idParamsSchema = object({
  id: objectIdString,
});
export type ByIdDTO = output<typeof idParamsSchema>;
