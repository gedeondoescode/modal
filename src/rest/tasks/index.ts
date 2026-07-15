import { Router } from "express";
import { getTaskByIdHandler } from "./handler/get-task-by-id.ts";
import { createTaskHandler } from "./handler/create-task.ts";
import { updateTaskHandler } from "./handler/update-task.ts";
import { deleteTaskHandler } from "./handler/delete-task.ts";
import { requireAuth } from "../require-auth.ts";
import { getAllTasksHandler } from "./handler/get-all.ts";

const taskRouter = Router();

taskRouter.use(requireAuth);

taskRouter.get("/", getAllTasksHandler);
taskRouter.post("/", createTaskHandler);

taskRouter.get("/:taskId", getTaskByIdHandler);
taskRouter.patch("/:taskId", updateTaskHandler);
taskRouter.delete("/:taskId", deleteTaskHandler);

export default taskRouter;
