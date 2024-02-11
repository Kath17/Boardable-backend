import express from "express";
import {
  getUserByUsernameController,
  getUsersController,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/users", getUsersController);
userRouter.get("/:username", getUserByUsernameController);

export default userRouter;
