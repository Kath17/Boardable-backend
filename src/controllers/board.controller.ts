import { NextFunction, Request, Response } from "express";

import {
  getBoards,
  getBoardById,
  createBoard,
} from "../services/board.service";
import { BoardableError } from "../middlewares/error.middleware";

export async function getBoardsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    const boards = await getBoards(username);
    res.status(200).json({ ok: true, boards: boards });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          "Error getting boards",
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function getBoardByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, boardId } = req.params;
    const board = await getBoardById(username, boardId);
    res.status(200).json({ ok: true, board: board });
    return;
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Board not found`, 404, "Controller Error", error)
      );
    }
  }
}

export async function createBoardController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    const newBoard = req.body;
    const board = await createBoard(username, newBoard);
    res.status(201).json({ ok: true, board: board });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't create board`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}
/*
export async function editNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, id } = req.params;
  try {
    const newBoard = req.body;
    const updatedNote = await editUserNote(username, id, newBoard);
    res.status(200).json({ ok: true, notes: updatedNote });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Couldn't edit note`, 500, "Controller Error", error)
      );
    }
  }
}

export async function deleteNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, id } = req.params;
    await deleteUserNote(username, id);
    res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `Couldn't delete note`,
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}
*/
