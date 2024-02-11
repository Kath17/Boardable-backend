import { NextFunction, Request, Response } from "express";
import { BoardableError } from "../middlewares/error.middleware";
import {
  createCard,
  deleteCard,
  getCardById,
  getCards,
  updateCard,
} from "../services/card.service";

export async function getCardsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId } = req.params;
    const cards = await getCards(username, boardId);
    res.status(200).json({ ok: true, cards: cards });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          "Error getting cards",
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function getCardByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId, cardId } = req.params;
    const card = await getCardById(username, boardId, cardId);
    res.status(200).json({ ok: true, card: card });
    return;
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Card not found`, 404, "Controller Error", error)
      );
    }
  }
}

export async function createCardController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId } = req.params;
    const newCard = req.body;
    const card = await createCard(username, boardId, newCard);
    res.status(201).json({ ok: true, card: card });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't create card`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function updateCardController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, boardId, cardId } = req.params;
  try {
    const newCard = req.body;
    const updatedCard = await updateCard(username, boardId, cardId, newCard);
    res.status(200).json({ ok: true, card: updatedCard });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't update card`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function deleteCardController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId, cardId } = req.params;
    await deleteCard(username, boardId, cardId);
    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't delete card`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}
