/// <reference types="node"/>
import { defineConfig, type Config } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./shared/drizzle/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
}) satisfies Config;
