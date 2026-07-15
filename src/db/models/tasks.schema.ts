import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { nanoid } from "nanoid";
import type { z } from "zod";

import { user } from "./auth.schema.ts";

export const taskTable = sqliteTable(
  "task",
  {
    id: text("id").primaryKey().$defaultFn(nanoid),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull().default("untitled"),
    notes: text("notes"),

    dateCreated: integer("creation_date", { mode: "timestamp_ms" })
      .$defaultFn(() => new Date())
      .notNull(),
    dateUpdated: integer("date_updated", { mode: "timestamp_ms" }).$defaultFn(() => new Date()),
  },
  (table) => [index("task_userId_idx").on(table.userId)],
);

export type InsertTask = typeof taskTable.$inferInsert;
export type SelectTask = typeof taskTable.$inferSelect;

export const createTaskSchema = createInsertSchema(taskTable, {
  title: (schema: z.ZodString) => schema.trim().min(1).max(200),
}).omit({
  id: true,
  userId: true,
  dateCreated: true,
  dateUpdated: true,
});
export const updateTaskSchema = createUpdateSchema(taskTable, {
  title: (schema: z.ZodString) => schema.trim().min(1).max(200),
})
  .pick({
    title: true,
    notes: true,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
