import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import postitRouter from "./routes/postit.router.js";
import cookieParser from "cookie-parser";
const app = express();
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://post-it-app-gilt.vercel.app"],

//   })
// );

app.use(express.json());
app.use(cookieParser());

// Configurar CORS
app.use(
  cors({
    origin: ["http://localhost:5173"], // Reemplaza con el origen de tu aplicación cliente
    credentials: true, // Habilita el intercambio de cookies
  })
);

app.use("/api", authRouter);
app.use("/api", postitRouter);

export default app;
