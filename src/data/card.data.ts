import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { Card, CardParams, CardParamsEdit } from "../models/card.model";
import { StringifyObject } from "./utils";

export async function getCards(
  userId: number,
  boardID: number
): Promise<Card[]> {
  try {
    return (
      await query(
        `SELECT * FROM cards WHERE user_id = $1 AND board_id = $2 ORDER BY id;`,
        [userId, boardID]
      )
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

export async function updateCard(
  card_id: string,
  newCard: CardParamsEdit
): Promise<Card> {
  try {
    let cardStringify = StringifyObject(newCard);
    return (
      await query(
        `UPDATE cards SET ${cardStringify} WHERE id = $1 RETURNING *;`,
        [card_id]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't edit card", 403, "Data Error", error);
  }
}

export async function deleteCard(card_id: string): Promise<Card> {
  try {
    return (
      await query(`DELETE FROM cards WHERE id = $1 RETURNING *;`, [card_id])
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't delete card", 403, "Data Error", error);
  }
}
