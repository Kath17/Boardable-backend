import express from "express";
import { UserSchema } from "../models/user.model";
import { validationMiddleware } from "../middlewares/validation.middleware";
import {
  createUserController,
  getUserByUsernameController,
  getUsersController,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/users", getUsersController);
userRouter.post(
  "/user",
  validationMiddleware(UserSchema),
  createUserController
);
userRouter.get("/:username", getUserByUsernameController);

export default userRouter;
