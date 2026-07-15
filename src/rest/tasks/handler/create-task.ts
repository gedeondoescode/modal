import type { Request, Response } from "express";
import { createTaskSchema, taskTable } from "../../../db/models/tasks.schema.ts";
import { db } from "../../../db/index.ts";

export const createTaskHandler = async (req: Request, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      result: false,
      error: "VALIDATION_ERROR",
      issues: parsed.error.issues,
    });
  }

  const [task] = await db
    .insert(taskTable)
    .values({
      ...parsed.data,
      userId: req.auth.user.id,
    })
    .returning();

  return res.status(201).json({
    result: true,
    data: task,
  });
};
