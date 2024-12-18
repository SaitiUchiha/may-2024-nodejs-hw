import { ApiError } from "../errors/api.error";
import {
  IUser,
  IUserDtoCreate,
  IUserDtoUpdate,
} from "../interfaces/user.interface";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: Partial<IUserDtoCreate>): Promise<IUser> {
    const email = dto.email;
    await commonMiddleware.isEmailUnique(email);
    return await userRepository.create(dto);
  }
  public async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async delete(id: string): Promise<void> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.delete(id);
  }

  public async update(userId: string, dto: IUserDtoUpdate): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.update(userId, dto);
  }
}

export const userService = new UserService();
