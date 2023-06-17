import { Router } from "express";
import {
  getPostIt,
  getPostIts,
  createPostIt,
  deletePostIt,
  updatePostIt,
} from "../controllers/postit.controllers.js";
import { createPostItSchema } from "../schemas/postit.schema.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/postits", authRequired, getPostIts);
router.get("/postits/:id", authRequired, getPostIt);
router.post(
  "/postits",
  authRequired,
  validateSchema(createPostItSchema),
  createPostIt
);
router.put("/postits/:id", authRequired, updatePostIt);
router.delete("/postits/:id", authRequired, deletePostIt);

export default router;
