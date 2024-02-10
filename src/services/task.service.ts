import * as taskDB from "../data/task.data";
import * as boardDB from "../data/board.data";
import * as cardDB from "../data/card.data";
import { BoardableError } from "../middlewares/error.middleware";
import { Task, TaskParams } from "../models/task.model";
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

export async function getTaskById(
  username: string,
  board_id: string,
  card_id: string,
  task_id: string
): Promise<Task> {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new BoardableError(
        `User: ${username} doesn't exist`,
        404,
        "Service Error"
      );
    }
    const board = await boardDB.getBoardById(board_id);
    if (!board)
      throw new BoardableError(`Board doesn't exist`, 404, "Service Error");
    const card = await cardDB.getCardById(card_id);
    if (!card)
      throw new BoardableError(`Card doesn't exist`, 404, "Service Error");
    const task = await taskDB.getTaskById(task_id);
    if (!task)
      throw new BoardableError(`Task doesn't exist`, 404, "Service Error");

    if (
      task.board_id !== board.id &&
      task.user_id !== user.id &&
      task.card_id !== card.id
    ) {
      throw new BoardableError(
        `Task doesn't belong to ${username}, to board ${board_id} or to card ${card_id}`,
        403,
        "Service Error"
      );
    }
    return task;
  } catch (error) {
    throw error;
  }
}

export async function createTask(
  username: string,
  boardId: string,
  cardId: string,
  newTask: TaskParams
): Promise<Task> {
  try {
    const user = await getUserByUsername(username);
    if (!user) throw new BoardableError("User not found", 404, "UserNotFound");

    const board = await getBoardById(username, boardId);
    if (!board)
      throw new BoardableError("Board not found", 404, "BoardNotFound");

    const card = await getCardById(username, boardId, cardId);
    if (!card) throw new BoardableError("Card not found", 404, "CardNotFound");

    return await taskDB.createTask(user.id, board.id, card.id, newTask);
  } catch (error) {
    throw error;
  }
}
