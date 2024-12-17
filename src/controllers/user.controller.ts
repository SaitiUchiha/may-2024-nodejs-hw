import { NextFunction, Request, Response } from "express";

import { IUser, IUserDtoUpdate } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.getUserById(userId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.delete(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const dto = req.body as IUserDtoUpdate;
      const result = await userService.update(userId, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
