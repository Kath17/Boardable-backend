import { NextFunction, Request, Response } from "express";
import {
  createUser,
  getUserByUsername,
  getUsers,
} from "../services/user.service";
import { BoardableError } from "../middlewares/error.middleware";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsers();
    res.status(200).json({ ok: true, message: "List of users", data: users });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          "Error obtaining list of users",
          500,
          "ControllerError",
          error
        )
      );
    }
  }
}

export async function getUserByUsernameController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.params;
  try {
    const user = await getUserByUsername(username);
    res.status(200).json({ ok: true, message: "User found", data: user });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          `User ${username} not found`,
          404,
          "Controller Error",
          error
        )
      );
    }
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;
    const newUser = await createUser(username, password);
    res.status(200).json({ ok: true, message: "Created", data: newUser });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(
          "Error creating users",
          500,
          "Controller Error",
          error
        )
      );
    }
  }
}
