import { NextFunction, Request, Response } from "express";
import { output, ZodObject } from "zod";

export type ValidatedRequest<T extends ZodObject> = Request<
  output<T>["params"],
  /* eslint-disable @typescript-eslint/no-explicit-any */
  any,
  output<T>["body"],
  output<T>["query"]
>;

/**
 * Middleware factory for validating request payloads with Zod.
 * @param schema - Zod schema with body, params, or query defined.
 */
export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    next();
  };
