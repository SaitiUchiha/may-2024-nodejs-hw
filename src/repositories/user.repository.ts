import { FilterQuery, SortOrder } from "mongoose";

import { UserListOrderEnum } from "../enums/user-list-order.enum";
import { ApiError } from "../errors/api.error";
import { IQueryList, IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(
    query: IQueryList,
  ): Promise<{ results: IUser[]; total: number }> {
    const filterObj: FilterQuery<IUser> = { isDeleted: false };
    if (query.search) {
      // filterObj.$or = [
      //   { name: { $regex: query.search, $options: "i" } },
      //   { email: { $regex: query.search, $options: "i" } },
      // ];
      filterObj.name = { $regex: query.search, $options: "i" };
    }
    const skip = query.limit * (query.page - 1);
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case UserListOrderEnum.NAME:
        sortObj.name = query.order;
        break;
      case UserListOrderEnum.AGE:
        sortObj.age = query.order;
        break;
      case UserListOrderEnum.CREATED:
        sortObj.createdAt = query.order;
        break;
      default:
        throw new ApiError("Invalid Order by", 400);
    }
    const [results, total] = await Promise.all([
      User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
    return { results, total };
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getMyId(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async deleteMe(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  public async updateMe(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, { new: true });
  }
}

export const userRepository = new UserRepository();
