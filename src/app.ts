import { configDotenv } from "dotenv";
import express from "express";
import errorHandler from "./middlewares/error.middleware";
import userRouter from "./routers/user.router";
import boardRouter from "./routers/board.router";
import cardRouter from "./routers/card.router";
import taskRouter from "./routers/task.router";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api/:username/boards", boardRouter);
app.use("/api/:username/boards/:boardId/cards", cardRouter);
app.use("/api/:username/boards/:boardId/cards/:taskId", taskRouter);

app.use(errorHandler);
