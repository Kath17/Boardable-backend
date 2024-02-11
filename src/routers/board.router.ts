import express from "express";

import { validationMiddleware } from "../middlewares/validation.middleware";
import { BoardEditSchema, BoardSchema } from "../models/board.model";
import {
  createBoardController,
  getBoardByIdController,
  getBoardsController,
  updateBoardController,
  deleteBoardController,
} from "../controllers/board.controller";
import { authenticateHandler } from "../middlewares/user-auth.middleware";

const boardRouter = express.Router({ mergeParams: true });

boardRouter.get("/", authenticateHandler, getBoardsController);
boardRouter.post(
  "/",
  authenticateHandler,
  validationMiddleware(BoardSchema),
  createBoardController
);
boardRouter.get("/:boardId", authenticateHandler, getBoardByIdController);
boardRouter.patch(
  "/:boardId",
  authenticateHandler,
  validationMiddleware(BoardEditSchema),
  updateBoardController
);
boardRouter.delete("/:boardId", authenticateHandler, deleteBoardController);

export default boardRouter;
