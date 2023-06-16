import User from "../models/user.models.js";

export const login = async (req, res) => {};

export const register = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  try {
    // Verificamos si existe un usuario con esos datos
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.json({ message: "Ya existe un usuario con ese email" });
    }

    // Creamos un nuevos usuario

    const newUser = new User({
      fullname,
      email,
      password,
      username,
    });

    const savedUser = await newUser.save();

    return res.json({ message: "Usuario creado", savedUser });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {};

export const verifyToken = async (req, res) => {};
