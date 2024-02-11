import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { Task, TaskParams, TaskParamsEdit } from "../models/task.model";
import { StringifyObject } from "./utils";

export async function getTasks(
  userId: number,
  boardId: number,
  cardId: number
): Promise<Task[]> {
  try {
    return (
      await query(
        `SELECT * FROM tasks WHERE user_id = $1 AND board_id = $2 AND card_id = $3 ORDER BY id;`,
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

export async function updateTask(
  task_id: string,
  newTask: TaskParamsEdit
): Promise<Task> {
  try {
    let taskStringify = StringifyObject(newTask);
    return (
      await query(
        `UPDATE tasks SET ${taskStringify} WHERE id = $1 RETURNING *;`,
        [task_id]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't edit task", 403, "Data Error", error);
  }
}

export async function deleteTask(task_id: string): Promise<Task> {
  try {
    return (
      await query(`DELETE FROM tasks WHERE id = $1 RETURNING *;`, [task_id])
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't delete task", 403, "Data Error", error);
  }
}
