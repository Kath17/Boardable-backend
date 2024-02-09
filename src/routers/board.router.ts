import express from "express";

import { validationMiddleware } from "../middlewares/validation.middleware";
import { BoardSchema } from "../models/board.model";
import {
  createBoardController,
  getBoardByIdController,
  getBoardsController,
} from "../controllers/board.controller";

const boardRouter = express.Router({ mergeParams: true });

boardRouter.get("/", getBoardsController);
boardRouter.post("/", validationMiddleware(BoardSchema), createBoardController);
boardRouter.get("/:boardId", getBoardByIdController);

export default boardRouter;
