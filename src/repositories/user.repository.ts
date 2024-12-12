import { ApiError } from "../errors/api.error";
import { IUser, IUserDto } from "../interfaces/user.interface";
import { read, result, write } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await read();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await write(users);
    return newUser;
  }

  public async getById(userId: number): Promise<IUser> {
    const users = await result();
    return users.find((user) => user.id === userId);
  }

  public async delete(id: number): Promise<void> {
    const users = await result();
    const filteredUsers = users.filter((user) => user.id !== id);
    await write(filteredUsers);
  }

  public async update(id: number, dto: IUserDto): Promise<IUser> {
    const users = await result();
    const findUserIndex = users.findIndex((user) => user.id === id);
    if (findUserIndex === -1) throw new ApiError("User not found", 404);
    users[findUserIndex] = { ...users[findUserIndex], ...dto };
    await write(users);
    return users[findUserIndex];
  }
}

export const userRepository = new UserRepository();
