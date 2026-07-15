import type { SelectTask } from "../../../db/models/tasks.schema.ts";

// If a due date is present, derive an overdue boolean field into the server response
// without storing it in the database
export const withOverdueResponse = (task: SelectTask) => {
  return {
    ...task,
    isOverdue: !task.isCompleted && task.dueDate != null && task.dueDate.getTime() < Date.now(),
  };
};
