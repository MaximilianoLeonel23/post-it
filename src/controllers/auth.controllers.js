import User from "../models/user.models.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  try {
    // Verificamos si existe un usuario con esos datos
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json(["The email already exists"]);
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
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).res.json({ message: "El email no existe" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json(["Invalid password"]);
    }

    const token = await createAccessToken({
      id: userFound._id,
    });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      fullname: userFound.fullname,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    res.status(400).json({ message: "Usuario no encontrado" });
  }

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    fullname: userFound.fullname,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log("token", token);
  if (!token) return res.status(401).json({ message: "Unauthorized token" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized token" });

    const userFound = await User.findById(user.id);
    console.log("userfound", userFound);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      fullname: userFound.fullname,
    });
  });
};
