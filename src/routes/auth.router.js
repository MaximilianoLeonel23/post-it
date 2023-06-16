import { Router } from "express";
import {
  login,
  register,
  logout,
  verifyToken,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/verify", verifyToken);

export default router;
