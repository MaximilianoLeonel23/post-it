import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import postitRouter from "./routes/postit.router.js";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", postitRouter);

export default app;
