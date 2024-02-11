import { Router } from "express";
import {
  loginController,
  signUpController,
  updateUserController,
} from "../controllers/user-auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UserEditSchema, UserSchema } from "../models/user.model";
import { authenticateHandler } from "../middlewares/user-auth.middleware";

export const authRouter = Router();

authRouter.post("/login", validationMiddleware(UserSchema), loginController);
authRouter.post("/signup", validationMiddleware(UserSchema), signUpController);
authRouter.patch(
  "/update/:username",
  authenticateHandler,
  validationMiddleware(UserEditSchema),
  updateUserController
);
