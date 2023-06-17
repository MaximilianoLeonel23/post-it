import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string({
    required_error: "El nombre completo es requerido",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
  username: z
    .string({
      required_error: "El usuario es requerido",
    })
    .min(6, {
      message: "El usuario debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});
