import express from "express";

import { validationMiddleware } from "../middlewares/validation.middleware";
import { BoardSchema } from "../models/board.model";
import {
  createBoardController,
  getBoardByIdController,
  getBoardsController,
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
//boardRouter.post("/:boardId", validationMiddleware(BoardEditSchema), updateBoardController);
//boardRouter.delete("/:boardId", deleteBoardController);

export default boardRouter;
