import { NextFunction, Request, Response } from "express";
import { BoardableError } from "../middlewares/error.middleware";
import { getTasks } from "../services/task.service";

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
