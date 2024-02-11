import express from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CardSchema } from "../models/card.model";
import {
  createCardController,
  getCardByIdController,
  getCardsController,
} from "../controllers/card.controller";
import { authenticateHandler } from "../middlewares/user-auth.middleware";

const cardRouter = express.Router({ mergeParams: true });

cardRouter.get("/", authenticateHandler, getCardsController);
cardRouter.post(
  "/",
  authenticateHandler,
  validationMiddleware(CardSchema),
  createCardController
);
cardRouter.get("/:cardId", authenticateHandler, getCardByIdController);
//cardRouter.post("/", validationMiddleware(CardSchema), updateCardController);
//cardRouter.delete("/:cardId", deleteCardController);

export default cardRouter;
