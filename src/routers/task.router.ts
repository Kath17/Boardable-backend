import express from "express";
//import { validationMiddleware } from "../middlewares/validation.middleware";
//import { TaskSchema } from "../models/task.model";
import {
  getTasksController,
  getTaskByIdController,
  //createTaskController,
} from "../controllers/task.controller";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", getTasksController);
//taskRouter.post("/", validationMiddleware(TaskSchema), createTaskController);
taskRouter.get("/:taskId", getTaskByIdController);
//taskRouter.post("/", validationMiddleware(TaskSchema), updateTaskController);
//taskRouter.delete("/:taskId", deleteTaskController);

export default taskRouter;
