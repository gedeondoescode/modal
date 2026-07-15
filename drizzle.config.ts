import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const dialect = process.env.DATABASE_DIALECT;

if (dialect !== "sqlite" && dialect !== "turso") {
  throw new Error('DATABASE_DIALECT must be either "sqlite" or "turso"');
}

const commonConfig = {
  schema: ["./src/db/models/**/*.schema.ts"],
  out: "./migrations",
};

export default defineConfig(
  dialect === "sqlite"
    ? {
        ...commonConfig,
        dialect: "sqlite",
        dbCredentials: {
          url: process.env.TURSO_CONNECTION_URL!,
        },
      }
    : {
        ...commonConfig,
        dialect: "turso",
        dbCredentials: {
          url: process.env.TURSO_CONNECTION_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN!,
        },
      },
);
