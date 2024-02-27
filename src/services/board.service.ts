import * as boardDB from "../data/board.data";
import { BoardableError } from "../middlewares/error.middleware";
import { Board, BoardParams } from "../models/board.model";
import { deleteCard, getCards } from "./card.service";
import { getUserByUsername } from "./user.service";

export async function getBoards(username: string): Promise<Board[]> {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new BoardableError("User not found", 404, "UserNotFound");
    }
    return await boardDB.getBoards(user.username);
  } catch (error) {
    throw error;
  }
}

export async function getBoardById(
  username: string,
  board_id: string
): Promise<Board> {
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
    if (!board) {
      throw new BoardableError(`Board doesn't exist`, 404, "Service Error");
    }
    if (board.user_id !== user.id) {
      throw new BoardableError(
        `Board doesn't belong to ${username}`,
        403,
        "Service Error"
      );
    }
    return board;
  } catch (error) {
    throw error;
  }
}

export async function createBoard(
  username: string,
  newBoard: BoardParams
): Promise<Board> {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new BoardableError("User not found", 404, "UserNotFound");
    }
    return await boardDB.createBoard(user, newBoard);
  } catch (error) {
    throw error;
  }
}

export async function updateBoard(
  username: string,
  board_id: string,
  newBoard: BoardParams
): Promise<Board> {
  try {
    await getBoardById(username, board_id);
    return await boardDB.updateBoard(board_id, newBoard);
  } catch (error) {
    throw error;
  }
}

export async function deleteBoard(
  username: string,
  board_id: string
): Promise<Board> {
  try {
    await getBoardById(username, board_id);
    const cards = await getCards(username, board_id);
    for (const card of cards) {
      await deleteCard(username, board_id, card.id.toString());
    }
    return await boardDB.deleteBoard(board_id);
  } catch (error) {
    throw error;
  }
}
