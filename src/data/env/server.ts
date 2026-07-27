import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    DB_PASSWORD: z.string().min(1).optional(),
    DB_HOST: z.string().min(1).optional(),
    DB_PORT: z.string().min(1).optional(),
    DB_USER: z.string().min(1).optional(),
    DB_NAME: z.string().min(1).optional(),
    ARCJET_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    HUME_API_KEY: z.string().min(1),
    HUME_SECRET_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
  },
  createFinalSchema: (env) => {
    return z.object(env).transform((val) => {
      if (val.DATABASE_URL) {
        return val;
      }

      const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, ...rest } = val;
      return {
        ...rest,
        DATABASE_URL: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      };
    });
  },
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
});
