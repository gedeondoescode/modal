import { Router } from "express";
import { getTaskByIdHandler } from "./handler/get-task-by-id.ts";
import { createTaskHandler } from "./handler/create-task.ts";
import { updateTaskHandler } from "./handler/update-task.ts";
import { deleteTaskHandler } from "./handler/delete-task.ts";
import { requireAuth } from "../require-auth.ts";

const taskRouter = Router();

taskRouter.use(requireAuth);

taskRouter.get("/:taskId", getTaskByIdHandler);
taskRouter.post("/create", createTaskHandler);
taskRouter.patch("/:taskId", updateTaskHandler);
taskRouter.delete("/:taskId", deleteTaskHandler);

export default taskRouter;
