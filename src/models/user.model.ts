import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "User should have at least 1 character"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password should have at least 6 character"),
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name should have at least 1 character")
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format")
    .optional(),
});

export const UserEditSchema = UserSchema.partial();
export type UserParamsEdit = z.infer<typeof UserEditSchema>;
export type UserParams = z.infer<typeof UserSchema>;
export type User = UserParams & {
  id: number;
};
