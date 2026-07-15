import { fromNodeHeaders } from "better-auth/node";
import type { RequestHandler } from "express";

import { auth } from "../utils/auth.ts";

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({
        result: false,
        error: "UNAUTHORIZED",
        message: "Authentication required",
      });
      return;
    }

    req.auth = session;
    next();
  } catch (error) {
    next(error);
  }
};
