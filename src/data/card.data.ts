import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { Card, CardParams } from "../models/card.model";

export async function getCards(
  userId: number,
  boardID: number
): Promise<Card[]> {
  try {
    return (
      await query(`SELECT * FROM cards WHERE user_id = $1 AND board_id = $2;`, [
        userId,
        boardID,
      ])
    ).rows;
  } catch (error) {
    throw new BoardableError("Couldn't get card", 403, "Data Error", error);
  }
}

export async function getCardById(card_id: string): Promise<Card> {
  try {
    return (await query(`SELECT * FROM cards WHERE id = $1;`, [card_id]))
      .rows[0];
  } catch (error) {
    throw new BoardableError("Card not found", 404, "Data Error", error);
  }
}

export async function createCard(
  userId: number,
  boardId: number,
  newCard: CardParams
): Promise<Card> {
  try {
    console.log("newCard: ", newCard);
    const { title } = newCard;

    return (
      await query(
        `INSERT INTO cards (title, user_id, board_id) VALUES ($1, $2, $3) RETURNING *;`,
        [title, userId, boardId]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't create card", 403, "Data Error", error);
  }
}
