import express from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CardSchema } from "../models/card.model";
import {
  createCardController,
  getCardByIdController,
  getCardsController,
} from "../controllers/card.controller";

const cardRouter = express.Router({ mergeParams: true });

cardRouter.get("/", getCardsController);
cardRouter.post("/", validationMiddleware(CardSchema), createCardController);
cardRouter.get("/:cardId", getCardByIdController);
//cardRouter.post("/", validationMiddleware(CardSchema), updateCardController);
//cardRouter.delete("/:cardId", deleteCardController);

export default cardRouter;
