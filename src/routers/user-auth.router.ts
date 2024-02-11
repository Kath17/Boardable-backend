import { Router } from "express";
import {
  loginController,
  signUpController,
} from "../controllers/user-auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UserSchema } from "../models/user.model";

export const authRouter = Router();

authRouter.post("/login", validationMiddleware(UserSchema), loginController);
authRouter.post("/signup", validationMiddleware(UserSchema), signUpController);
