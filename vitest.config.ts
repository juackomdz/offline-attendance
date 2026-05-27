import { defineConfig } from "vitest/config";
import path from "node:path";

const rootDir = path.resolve(__dirname);

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            "@": path.resolve(rootDir, "app"),
            "#shared": path.resolve(rootDir, "shared"),
          },
        },
        test: {
          name: "unit",
          include: ["test/unit/*.{test,spec}.ts"],
          environment: "node",
        },
      },
    ],
  },
});
