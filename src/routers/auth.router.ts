import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
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

export const authRouter = router;
