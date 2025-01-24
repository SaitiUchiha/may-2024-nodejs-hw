import { RoleEnum } from "../enums/role.enum";

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
