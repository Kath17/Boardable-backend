import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { Task } from "../models/task.model";

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
