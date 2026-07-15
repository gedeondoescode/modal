import type { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

const getSession = vi.fn();

vi.mock("../utils/auth.ts", () => ({
  auth: {
    api: {
      getSession,
    },
  },
}));

const { requireAuth } = await import("../rest/require-auth.ts");

function mockRes() {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as unknown as Response;
}

describe("requireAuth", () => {
  beforeEach(() => {
    getSession.mockReset();
  });

  it("returns 401 if no session is present", async () => {
    getSession.mockResolvedValue(null);

    const req = { headers: {} } as Request;
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    await requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "UNAUTHORIZED" }));
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches the session and calls next when authenticated", async () => {
    const session = {
      user: { id: "test_user_1", email: "test@example.com" },
      session: { id: "test_session_1" },
    };

    getSession.mockResolvedValue(session);

    const req = { headers: {} } as Request;
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    await requireAuth(req, res, next);

    expect(req.auth).toEqual(session);
    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });
});
