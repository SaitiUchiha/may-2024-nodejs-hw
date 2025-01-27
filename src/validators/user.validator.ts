import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

export class userValidator {
  private static name = joi.string().min(3).max(20).trim();
  private static age = joi.number().min(18);
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstant.PHONE).trim();

  public static create = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.optional(),
  });

  public static update = joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public static signIn = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static lostPassword = joi.object({
    email: this.email.required(),
  });

  public static changePassword = joi.object({
    newPassword: this.password.required(),
    oldPassword: this.password.required(),
  });

  public static getListQuery = joi.object({
    limit: joi.number().min(1).max(10).default(5),
    page: joi.number().min(1).default(1),
    search: joi.string().trim(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderEnum))
      .default(UserListOrderEnum.CREATED),
  });
}
