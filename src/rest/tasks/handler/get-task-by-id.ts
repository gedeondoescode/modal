import type { Request, Response } from "express";
import { db } from "../../../db/index.ts";
import { taskTable } from "../../../db/models/tasks.schema.ts";
import { and, eq } from "drizzle-orm";

export const getTaskByIdHandler = async (req: Request<{ taskId: string }>, res: Response) => {
  const taskId = req.params.taskId;

  const [task] = await db
    .select()
    .from(taskTable)
    .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, req.auth.user.id)))
    .limit(1);

  if (!task) {
    return res.status(404).json({
      result: false,
      error: "NOT_FOUND",
      message: "Task not found",
    });
  }

  return res.status(200).json({
    result: true,
    data: task,
  });
};
