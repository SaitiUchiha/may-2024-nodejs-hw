import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.validateBody(userValidator.create),
  userController.create,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);
router.patch(
  "/:userId",
  commonMiddleware.validateBody(userValidator.update),
  userController.update,
);
router.delete("/:userId", userController.delete);
export const userRouter = router;
