/* eslint-disable */
import zod from "zod";

const environmentSchema = zod.object({
  SENTRY_DNC: zod.string().min(5),
  SERVER_URL: zod.string().min(5),
});

export const env = environmentSchema.parse({
  SENTRY_DNC: process.env.SENTRY_DNC,
  SERVER_URL: process.env.SERVER_URL,
});
