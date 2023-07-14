import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
// export const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1/post-it-app";
export const MONGODB_URI = `mongodb+srv://maximiliano:${process.env.MONGODB_PASSWORD}@cluster0.ulu4jdk.mongodb.net/post-it-app?retryWrites=true&w=majority`;

export const FRONTEND_URL = process.env.FRONTEND_URL;
