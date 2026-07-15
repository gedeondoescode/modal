import type { Request, Response } from "express";
import { taskTable, updateTaskSchema } from "../../../db/models/tasks.schema.ts";
import { db } from "../../../db/index.ts";
import { and, eq } from "drizzle-orm";

export const updateTaskHandler = async (req: Request<{ taskId: string }>, res: Response) => {
  const taskId = req.params.taskId;
  const parsed = updateTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      result: false,
      error: "VALIDATION_ERROR",
      issues: parsed.error.issues,
    });
  }

  const [task] = await db
    .update(taskTable)
    .set({
      ...parsed.data,
      dateUpdated: new Date(),
    })
    .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, req.auth.user.id)))
    .returning();

  if (!task) {
    return res.status(404).json({
      result: false,
      error: "NOT_FOUND",
      message: "Task not found",
    });
  }

  return res.json({
    result: true,
    data: task,
  });
};
