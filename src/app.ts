import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware";
import userRouter from "./routers/user.router";
import boardRouter from "./routers/board.router";
import cardRouter from "./routers/card.router";
import taskRouter from "./routers/task.router";
import { authRouter } from "./routers/user-auth.router";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

const corsOptions = {
  origin: process.env["CLIENT_ORIGIN"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api/:username/boards", boardRouter);
app.use("/api/:username/boards/:boardId/cards", cardRouter);
app.use("/api/:username/boards/:boardId/cards/:cardId/tasks", taskRouter);

app.use(errorHandler);
