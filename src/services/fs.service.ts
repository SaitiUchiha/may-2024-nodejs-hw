import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const pathToFile1 = path.resolve(process.cwd(), "db", "users.json");
const pathToFile2 = path.resolve(process.cwd(), "db", "users2.json");

const read = async (): Promise<IUser[]> => {
  try {
    const json = await fs.readFile(pathToFile1, "utf-8");
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const write = async (users: IUser[]): Promise<void> => {
  try {
    await fs.writeFile(pathToFile2, JSON.stringify(users, null, 2));
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const result = async (): Promise<IUser[]> => {
  try {
    const json = await fs.readFile(pathToFile2, "utf-8");
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.log("Error:", error.message);
  }
};
export { read, result, write };
