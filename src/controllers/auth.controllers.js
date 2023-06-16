import User from "../models/user.models.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.json({ message: "El email no existe" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.json({ message: "La contraseña es inválida" });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      fullname: userFound.fullname,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  try {
    // Verificamos si existe un usuario con esos datos
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.json({ message: "Ya existe un usuario con ese email" });
    }

    // Encrptar contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Creamos un nuevos usuario
    const newUser = new User({
      fullname,
      email,
      password: encryptedPassword,
      username,
    });

    // Guardo en base de datos
    const savedUser = await newUser.save();

    // Creo el token
    const token = await createAccessToken({ id: savedUser._id });

    res.cookie("token", token);
    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      fullname: savedUser.fullname,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "");
  return res.status(200).json({ message: "Token eliminado" });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.send(false);
  }

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findOne(user.id);

    if (!userFound) {
      return res.sendStatus(401);
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      fullname: userFound.username,
    });
  });
};
