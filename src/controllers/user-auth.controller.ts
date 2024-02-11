import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BoardableError } from "../middlewares/error.middleware";
import { createUser, getUserByUsername } from "../services/user.service";

const jwtSecret = "ultra-secret";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    console.log("username: ", username);
    console.log("password: ", password);
    const user = await getUserByUsername(username);
    const validPass = await bcrypt.compare(password, user.password);

    if (validPass) {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "4h" });
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
    next(error);
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

    res.status(201).json({
      ok: true,
      message: "Register successful",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export { loginController, signUpController };
