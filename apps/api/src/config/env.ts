import "dotenv/config";
import { object, string, treeifyError, url } from "zod";
import { logger } from "@axon/logger";

const envSchema = object({
  PORT: string().transform(Number),
  DB_URI: url(),
  CLERK_PUBLISHABLE_KEY: string(),
  CLERK_SECRET_KEY: string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error(treeifyError(parsed.error).properties, "Invalid ENV");
  process.exit(1);
}

export default parsed.data;
