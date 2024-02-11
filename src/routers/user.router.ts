import express from "express";
import {
  getUserByUsernameController,
  getUsersController,
} from "../controllers/user.controller";
import { authenticateHandler } from "../middlewares/user-auth.middleware";

const userRouter = express.Router();

userRouter.get("/users", getUsersController);
userRouter.get("/:username", authenticateHandler, getUserByUsernameController);

export default userRouter;
