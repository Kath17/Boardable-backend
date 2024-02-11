import express from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { TaskSchema } from "../models/task.model";
import {
  getTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import { authenticateHandler } from "../middlewares/user-auth.middleware";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", authenticateHandler, getTasksController);
taskRouter.post(
  "/",
  authenticateHandler,
  validationMiddleware(TaskSchema),
  createTaskController
);
taskRouter.get("/:taskId", authenticateHandler, getTaskByIdController);
taskRouter.patch(
  "/:taskId",
  authenticateHandler,
  validationMiddleware(TaskSchema),
  updateTaskController
);
taskRouter.delete("/:taskId", authenticateHandler, deleteTaskController);

export default taskRouter;
