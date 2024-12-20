import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserDtoUpdate } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getMe(TokenPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getMyId(TokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteMe(TokenPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(TokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteMe(TokenPayload.userId);
  }

  public async updateMe(
    TokenPayload: ITokenPayload,
    dto: IUserDtoUpdate,
  ): Promise<IUser> {
    const user = await userRepository.getById(TokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateMe(TokenPayload.userId, dto);
  }
}

export const userService = new UserService();
