import { NextFunction, Request, Response } from "express";

import { IVerifyToken } from "../interfaces/action-token.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  ILostPassword,
  ILostPasswordSet,
  ISignIn,
  IUserDtoCreate,
} from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserDtoCreate;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;
      const result = await authService.refresh(tokenPayload, refreshToken);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const tokenId = req.res.locals.tokenId as string;
      const result = await authService.logout(tokenPayload, tokenId);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const result = await authService.logoutAll(tokenPayload);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async lostPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ILostPassword;
      await authService.lostPassword(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async lostPasswordSet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as ILostPasswordSet;
      await authService.lostPasswordSet(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IVerifyToken;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await authService.verify(dto, tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IChangePassword;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await authService.changePassword(dto, tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
