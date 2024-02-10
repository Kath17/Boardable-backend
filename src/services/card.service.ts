import * as cardDB from "../data/card.data";
import * as boardDB from "../data/board.data";
import { BoardableError } from "../middlewares/error.middleware";
import { Card, CardParams } from "../models/card.model";
import { getBoardById } from "./board.service";
import { getUserByUsername } from "./user.service";

export async function getCards(
  username: string,
  boardId: string
): Promise<Card[]> {
  try {
    console.log("username: ", username);
    const user = await getUserByUsername(username);
    if (!user) throw new BoardableError("User not found", 404, "UserNotFound");
    const board = await getBoardById(username, boardId);
    if (!board)
      throw new BoardableError("Board not found", 404, "BoardNotFound");

    return await cardDB.getCards(user.id, board.id);
  } catch (error) {
    throw error;
  }
}

export async function getCardById(
  username: string,
  board_id: string,
  card_id: string
): Promise<Card> {
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
    if (card.board_id !== board.id && card.user_id !== user.id) {
      throw new BoardableError(
        `Card doesn't belong to ${username} or to board ${board_id}`,
        403,
        "Service Error"
      );
    }
    return card;
  } catch (error) {
    throw error;
  }
}

export async function createCard(
  username: string,
  boardId: string,
  newCard: CardParams
): Promise<Card> {
  try {
    const user = await getUserByUsername(username);
    if (!user) throw new BoardableError("User not found", 404, "UserNotFound");

    const board = await getBoardById(username, boardId);
    if (!board) throw new BoardableError("Card not found", 404, "CardNotFound");

    return await cardDB.createCard(user.id, board.id, newCard);
  } catch (error) {
    throw error;
  }
}
