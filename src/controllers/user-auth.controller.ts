import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BoardableError } from "../middlewares/error.middleware";
import {
  createUser,
  deleteUser,
  getUserByUsername,
  updateUser,
} from "../services/user.service";

const jwtSecret = "ultra-secret";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    const validPass = await bcrypt.compare(password, user.password);

    if (validPass) {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "8h" });
      res
        .status(200)
        .json({ ok: true, message: "Login exitoso", data: { token } });
    } else {
      throw new BoardableError(
        "Invalid credentials",
        401,
        "Error at controllers"
      );
    }
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Couldn't LogIn`, 500, "Controller Error", error)
      );
    }
  }
};

const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const costFactor = 10;

    let newUser = req.body;
    newUser.password = await bcrypt.hash(newUser.password, costFactor);
    newUser = await createUser(newUser.username, newUser.password);
    const payload = { userId: newUser.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "8h" });

    res.status(201).json({
      ok: true,
      message: "Register successful",
      data: { newUser, token },
    });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Couldn't SignUp`, 500, "Controller Error", error)
      );
    }
  }
};

const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const costFactor = 10;
    let newUser = req.body;

    if (newUser.password)
      newUser.password = await bcrypt.hash(newUser.password, costFactor);

    const updatedUser = await updateUser(username, newUser);

    res.status(201).json({
      ok: true,
      message: "Updated successful",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Couldn't Update`, 500, "Controller Error", error)
      );
    }
  }
};

const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const deletedUser = await deleteUser(username);
    res.status(200).json({
      ok: true,
      message: "Deleted successful",
      data: deletedUser,
    });
  } catch (error) {
    if (error instanceof BoardableError) {
      next(error);
    } else {
      next(
        new BoardableError(`Couldn't Delete`, 500, "Controller Error", error)
      );
    }
  }
};

export {
  loginController,
  signUpController,
  updateUserController,
  deleteUserController,
};
