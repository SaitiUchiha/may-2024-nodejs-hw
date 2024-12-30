import { config } from "../configs/configs";
import { ActionTokenTypeEnum } from "../enums/action-token.type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.error";
import { IVerifyToken } from "../interfaces/action-token.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IForgotPassword,
  IForgotPasswordSet,
  ISignIn,
  IUser,
  IUserDtoCreate,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUserDtoCreate,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    const actionToken = tokenService.generateActionTokens(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.EMAIL_VERIFICATION,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.EMAIL_VERIFICATION,
      _userId: user._id,
      token: actionToken,
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, config.smtpEmail, {
      name: user.name,
      frontUrl: config.frontUrl,
      actionToken,
    });
    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getEmail(dto.email);
    if (!user) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const correctPassword = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!correctPassword) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async refresh(
    tokenPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOldToken({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: tokenPayload.userId,
      role: tokenPayload.role,
    });
    await tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });
    return tokens;
  }

  public async logout(
    tokenPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> {
    const user = await userRepository.getById(tokenPayload.userId);
    await tokenRepository.deleteOldToken({ _id: tokenId });
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, config.smtpEmail, {
      name: user.name,
      frontUrl: config.frontUrl,
    });
  }

  public async logoutAll(tokenPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(tokenPayload.userId);
    await tokenRepository.deleteOldTokens({ _userId: tokenPayload.userId });
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, config.smtpEmail, {
      name: user.name,
      frontUrl: config.frontUrl,
    });
  }

  public async forgotPassword(dto: IForgotPassword): Promise<void> {
    const user = await userRepository.getEmail(dto.email);
    if (!user) return;

    const token = tokenService.generateActionTokens(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
      token,
    });
    await emailService.sendEmail(
      EmailTypeEnum.FORGOT_PASSWORD,
      config.smtpEmail,
      {
        name: user.name,
        frontUrl: config.frontUrl,
        actionToken: token,
      },
    );
  }

  public async forgotPasswordSet(dto: IForgotPasswordSet): Promise<void> {
    const payload = tokenService.verifyToken(
      dto.token,
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateMe(payload.userId, { password });
    await Promise.all([
      actionTokenRepository.deleteOldToken({ token: dto.token }),
      tokenRepository.deleteOldTokens({ _userId: payload.userId }),
    ]);
  }

  public async verify(
    dto: IVerifyToken,
    tokenPayload: ITokenPayload,
  ): Promise<void> {
    await userRepository.updateMe(tokenPayload.userId, { isVerified: true });
    await actionTokenRepository.deleteOldToken({ token: dto.token });
  }
}

export const authService = new AuthService();
