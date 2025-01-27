import { config } from "../configs/configs";
import {
  IQueryList,
  IUser,
  IUserListResponse,
  IUserResponse,
  IUserShortResponse,
} from "../interfaces/user.interface";

class UserPresenter {
  public toResponse(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      avatar: entity.avatar
        ? `${config.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      role: entity.role,
      phone: entity.phone,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public toShortResponse(entity: IUser): IUserShortResponse {
    return {
      _id: entity._id,
      name: entity.name,
      age: entity.age,
      avatar: entity.avatar
        ? `${config.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      createdAt: entity.createdAt,
    };
  }

  public toResponseList(
    results: IUser[],
    total: number,
    query: IQueryList,
  ): IUserListResponse {
    return {
      data: results.map(this.toShortResponse),
      total,
      ...query,
    };
  }
}

export const userPresenter = new UserPresenter();
