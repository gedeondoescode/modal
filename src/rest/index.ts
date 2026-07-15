import { Router } from "express";
import taskRouter from "./tasks/index.ts";
import { requireAuth } from "./require-auth.ts";

const restRouter = Router();

restRouter.get("/me", requireAuth, (req, res) => {
  res.status(200).json({
    result: true,
    data: req.auth.user,
  });
});
restRouter.use("/tasks", taskRouter);

export default restRouter;
