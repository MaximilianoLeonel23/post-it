import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRouter);

export default app;
