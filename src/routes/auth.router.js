import { Router } from "express";
import {
  login,
  register,
  logout,
  verifyToken,
  profile,
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);

export default router;
