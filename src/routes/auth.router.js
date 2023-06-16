import { Router } from "express";
import {
  login,
  register,
  logout,
  verifyToken,
} from "../controllers/auth.controllers.js";
import {} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken);

export default router;
