import { ApiError } from "../errors/api.error";
import {
  IUser,
  IUserDtoCreate,
  IUserDtoUpdate,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: Partial<IUserDtoCreate>): Promise<IUser> {
    await this.isEmailUnuque(dto.email);
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400,
      );
    }
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

  private async isEmailUnuque(email: string): Promise<void> {
    const user = await userRepository.getEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }
}

export const userService = new UserService();
