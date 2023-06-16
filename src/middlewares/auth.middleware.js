import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No hay token, acceso denegado" });
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "El token no es válido" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
