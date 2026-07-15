import { eq } from "drizzle-orm";
import { db } from "../../../db/index.ts";
import { taskTable } from "../../../db/models/tasks.schema.ts";
import type { Request, Response } from "express";
import { withOverdueResponse } from "./overdue-response.ts";

export const getAllTasksHandler = async (req: Request, res: Response) => {
  const tasks = await db.select().from(taskTable).where(eq(taskTable.userId, req.auth.user.id));

  return res.status(200).json({
    result: true,
    data: tasks.map(withOverdueResponse),
  });
};
