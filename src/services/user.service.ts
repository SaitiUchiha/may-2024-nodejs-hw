import { UploadedFile } from "express-fileupload";

import { FileTypeEnum } from "../enums/file-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import {
  IQueryList,
  IUser,
  IUserDtoUpdate,
  IUserListResponse,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: IQueryList): Promise<IUserListResponse> {
    const { results, total } = await userRepository.getList(query);
    return userPresenter.toResponseList(results, total, query);
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

  public async uploadAvatar(
    tokenPayload: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(tokenPayload.userId);
    const avatar = await s3Service.uploadFile(
      file,
      FileTypeEnum.USER,
      user._id,
    );
    const updatedUser = await userRepository.updateMe(user._id, { avatar });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updatedUser;
  }

  public async deleteAvatar(tokenPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(tokenPayload.userId);
    await s3Service.deleteFile(user.avatar);
    const updatedUser = await userRepository.updateMe(user._id, {
      avatar: null,
    });
    return updatedUser;
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
