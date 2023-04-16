import { Router } from "express";
import passport from "passport";
import * as UserController from "../controller/UserController.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.index
);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  UserController.getCurrentUser
);

export default router;
