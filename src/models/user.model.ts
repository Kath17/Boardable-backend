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
});

export type UserParams = z.infer<typeof UserSchema>;
export type User = UserParams & {
  id: number;
};
