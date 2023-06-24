import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import postitRouter from "./routes/postit.router.js";
import cookieParser from "cookie-parser";
const app = express();

const corsOptions = {
  origin: "https://post-it-app-gilt.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", postitRouter);

export default app;
