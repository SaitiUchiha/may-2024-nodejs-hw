import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token.type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { authValidator } from "../validators/auth.validator";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.validateBody(userValidator.create),
  commonMiddleware.isEmailUnique,
  authController.signUp,
);
router.post(
  "/sign-in",
  commonMiddleware.validateBody(userValidator.signIn),
  authController.signIn,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.post(
  "/logout/all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);

router.post(
  "/password/lost",
  commonMiddleware.validateBody(userValidator.lostPassword),
  authController.lostPassword,
);

router.put(
  "/password/lost",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.LOST_PASSWORD),
  authController.lostPasswordSet,
);

router.put(
  "/password/change",
  commonMiddleware.validateBody(userValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword,
);

router.post(
  "/verify-email",
  commonMiddleware.validateBody(authValidator.verify),
  authMiddleware.checkActionToken(ActionTokenTypeEnum.EMAIL_VERIFICATION),
  authController.verify,
);

export const authRouter = router;
