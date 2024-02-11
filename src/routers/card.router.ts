import express from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CardEditSchema, CardSchema } from "../models/card.model";
import {
  createCardController,
  getCardByIdController,
  getCardsController,
  updateCardController,
  deleteCardController,
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
cardRouter.patch(
  "/:cardId",
  authenticateHandler,
  validationMiddleware(CardEditSchema),
  updateCardController
);
cardRouter.delete("/:cardId", authenticateHandler, deleteCardController);

export default cardRouter;
