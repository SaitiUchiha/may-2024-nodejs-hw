import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

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

  public static isEmailValid = joi.object({
    email: this.email,
  });
}
