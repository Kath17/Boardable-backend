import { NextFunction, Request, Response } from "express";
import { BoardableError } from "../middlewares/error.middleware";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service";

export async function getTasksController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId, cardId } = req.params;
    const tasks = await getTasks(username, boardId, cardId);
    res.status(200).json({ ok: true, tasks: tasks });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          "Error getting tasks",
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function getTaskByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId, cardId, taskId } = req.params;
    const task = await getTaskById(username, boardId, cardId, taskId);
    res.status(200).json({ ok: true, task: task });
    return;
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Task not found`, 404, "Controller Error", error)
      );
    }
  }
}

export async function createTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId, cardId } = req.params;
    const newTask = req.body;
    const task = await createTask(username, boardId, cardId, newTask);
    res.status(201).json({ ok: true, task: task });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't create task`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function updateTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, boardId, cardId, taskId } = req.params;
  try {
    const newTask = req.body;
    const updatedTask = await updateTask(
      username,
      boardId,
      cardId,
      taskId,
      newTask
    );
    res.status(200).json({ ok: true, task: updatedTask });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't update task`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function deleteTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId, cardId, taskId } = req.params;
    await deleteTask(username, boardId, cardId, taskId);
    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't delete task`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}
