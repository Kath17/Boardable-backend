import * as taskDB from "../data/task.data";
import { BoardableError } from "../middlewares/error.middleware";
import { Task } from "../models/task.model";
import { getBoardById } from "./board.service";
import { getCardById } from "./card.service";
import { getUserByUsername } from "./user.service";

export async function getTasks(
  username: string,
  boardId: string,
  cardId: string
): Promise<Task[]> {
  try {
    const user = await getUserByUsername(username);
    if (!user) throw new BoardableError("User not found", 404, "UserNotFound");
    const board = await getBoardById(username, boardId);
    if (!board)
      throw new BoardableError("Board not found", 404, "BoardNotFound");
    const card = await getCardById(username, boardId, cardId);
    if (!card) throw new BoardableError("Task not found", 404, "TaskNotFound");

    return await taskDB.getTasks(user.id, board.id, card.id);
  } catch (error) {
    throw error;
  }
}
