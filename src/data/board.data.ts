import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { Board, BoardParams, BoardParamsEdit } from "../models/board.model";
import { User } from "../models/user.model";
import { getUserByUsername } from "../services/user.service";
import { StringifyObject } from "./utils";

export async function getBoards(username: string): Promise<Board[]> {
  try {
    const user = await getUserByUsername(username);
    return (
      await query(`SELECT * FROM boards WHERE user_id = $1 ORDER BY id;`, [
        user.id,
      ])
    ).rows;
  } catch (error) {
    throw new BoardableError("Couldn't get board", 403, "Data Error", error);
  }
}

export async function getBoardById(board_id: string): Promise<Board> {
  try {
    return (await query(`SELECT * FROM boards WHERE id = $1;`, [board_id]))
      .rows[0];
  } catch (error) {
    throw new BoardableError("Board not found", 404, "Data Error", error);
  }
}

export async function createBoard(
  user: User,
  newBoard: BoardParams
): Promise<Board> {
  try {
    const { title, color } = newBoard;

    return (
      await query(
        `INSERT INTO boards (title, color, user_id) VALUES ($1, $2, $3) RETURNING *;`,
        [title, color, user.id]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't create board", 403, "Data Error", error);
  }
}

export async function updateBoard(
  board_id: string,
  newBoard: BoardParamsEdit
): Promise<Board> {
  try {
    let boardStringify = StringifyObject(newBoard);
    return (
      await query(
        `UPDATE boards SET ${boardStringify} WHERE id = $1 RETURNING *;`,
        [board_id]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't edit board", 403, "Data Error", error);
  }
}

export async function deleteBoard(board_id: string): Promise<Board> {
  try {
    return (
      await query(`DELETE FROM boards WHERE id = $1 RETURNING *;`, [board_id])
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't delete board", 403, "Data Error", error);
  }
}
