/// <reference types="bun"/>
import { defineConfig, type Config } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./shared/drizzle/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `:memory:`,
  },
}) satisfies Config;
