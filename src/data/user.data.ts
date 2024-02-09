import { query } from "../db";
import { BoardableError } from "../middlewares/error.middleware";
import { User } from "../models/user.model";

export async function getUsers(): Promise<User[]> {
  try {
    return (await query("SELECT * FROM users;")).rows;
  } catch (error) {
    throw new BoardableError("Couldn't get users", 403, "Data error", error);
  }
}

export async function createUser(
  username: string,
  password: string
): Promise<User> {
  try {
    return (
      await query(
        `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *;`,
        [username, password]
      )
    ).rows[0];
  } catch (error) {
    throw new BoardableError("Couldn't create user", 403, "Data Error", error);
  }
}

export async function getUserByUsername(username: string): Promise<User> {
  try {
    return (await query("SELECT * FROM users WHERE username = $1;", [username]))
      .rows[0];
  } catch (error) {
    throw new BoardableError(
      "Username isn't registered",
      403,
      "Data error",
      error
    );
  }
}

export async function getUserById(id: number) {
  try {
    return (await query("SELECT * FROM users WHERE id = $1;", [id])).rows[0];
  } catch (error) {
    throw new BoardableError("User doesn't exist", 403, "Data error", error);
  }
}
