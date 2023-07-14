import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.router.js";
import postitRouter from "./src/routes/postit.router.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/database.js";
import { PORT } from "./src/config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Configurar CORS
app.use(
  cors({
    origin: "https://post-it-app-gilt.vercel.app",
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api", postitRouter);

const main = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    app.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.log(error);
  }
};

main();
