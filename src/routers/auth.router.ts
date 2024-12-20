import { Router } from "express";

import { authController } from "../controllers/auth.controller";
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
  // commonMiddleware.validateBody(userValidator.create),
  authController.signIn,
);

// router.post("/refresh", authController.refresh);

export const authRouter = router;
