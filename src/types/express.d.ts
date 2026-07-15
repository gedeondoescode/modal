import type { auth } from "../utils/auth.ts";

declare global {
  namespace Express {
    interface Request {
      auth: typeof auth.$Infer.Session;
    }
  }
}

export {};
