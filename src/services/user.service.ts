import { User } from "../models/user.model";
import * as userDB from "../data/user.data";
import { BoardableError } from "../middlewares/error.middleware";

export async function getUsers(): Promise<User[]> {
  try {
    return await userDB.getUsers();
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    const user = await userDB.getUserById(id);
    if (!user)
      throw new BoardableError("User doesn't exist", 403, "Error at service");
    return user;
  } catch (error) {
    throw error;
  }
}

export async function createUser(
  username: string,
  password: string
): Promise<User> {
  try {
    const user = await userDB.getUserByUsername(username);
    if (user) {
      throw new BoardableError("Usuario ya existe", 403, "Service Error");
    }
    return await userDB.createUser(username, password);
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<User> {
  try {
    const user = await userDB.getUserByUsername(username);
    if (!user) {
      throw new BoardableError("User doesn't exist", 403, "Error at service");
    }
    return user;
  } catch (error) {
    throw error;
  }
}
