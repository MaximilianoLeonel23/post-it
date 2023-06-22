import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string({
    required_error: "Fullname is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must have at least 8 characters",
    }),
  username: z
    .string({
      required_error: "User is required",
    })
    .min(6, {
      message: "User must have at least 8 characters",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must have at least 8 characters",
    }),
});
