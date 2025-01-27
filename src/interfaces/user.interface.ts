import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  avatar?: string;
  role: RoleEnum;
  phone?: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserDtoCreate = Pick<
  IUser,
  "name" | "email" | "age" | "password" | "phone"
>;

export type IUserDtoUpdate = Pick<IUser, "name" | "age" | "phone">;
export type ISignIn = Pick<IUser, "email" | "password">;

export type ILostPassword = Pick<IUser, "email">;
export type ILostPasswordSet = Pick<IUser, "password"> & { token: string };

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IQueryList = {
  page: number;
  limit: number;
  search?: string;
  order: OrderEnum;
  orderBy: UserListOrderEnum;
};

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "age"
  | "avatar"
  | "role"
  | "phone"
  | "isDeleted"
  | "isVerified"
  | "createdAt"
  | "updatedAt"
>;

export type IUserShortResponse = Pick<
  IUser,
  "_id" | "name" | "avatar" | "createdAt"
>;

export interface IUserListResponse extends IQueryList {
  data: IUserShortResponse[];
  total: number;
}
