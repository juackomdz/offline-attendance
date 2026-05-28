/// <reference types="bun"/>
import { defineConfig, type Config } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./shared/drizzle/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: Bun.env.TURSO_DB_URL!,
    authToken: Bun.env.TURSO_AUTH_TOKEN!,
  },
}) satisfies Config;
