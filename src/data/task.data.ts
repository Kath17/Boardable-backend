import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { Task, TaskParams } from "../models/task.model";

export async function getTasks(
  userId: number,
  boardId: number,
  cardId: number
): Promise<Task[]> {
  try {
    return (
      await query(
        `SELECT * FROM tasks WHERE user_id = $1 AND board_id = $2 AND card_id = $3;`,
        [userId, boardId, cardId]
      )
    ).rows;
  } catch (error) {
    throw new BoardableError("Couldn't get task", 403, "Data Error", error);
  }
}

export async function getTaskById(task_id: string): Promise<Task> {
  try {
    return (await query(`SELECT * FROM tasks WHERE id = $1;`, [task_id]))
      .rows[0];
  } catch (error) {
    throw new BoardableError("Task not found", 404, "Data Error", error);
  }
}

export async function createTask(
  userId: number,
  boardId: number,
  cardId: number,
  newCard: TaskParams
): Promise<Task> {
  try {
    const { task } = newCard;

    return (
      await query(
        `INSERT INTO tasks (task, user_id, board_id, card_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [task, userId, boardId, cardId]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't create task", 403, "Data Error", error);
  }
}
