import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/index.ts";
import * as authSchema from "../db/models/auth.schema.ts";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: authSchema,
  }),
  basePath: "/rest/auth",
  emailAndPassword: { enabled: true },
});
