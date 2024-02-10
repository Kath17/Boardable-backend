import { z } from "zod";

export const CardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title must have at least 1 character"),
  user_id: z.number().int().positive().optional(),
  board_id: z.number().int().positive().optional(),
});

export const CardEditSchema = CardSchema.partial();

export type CardParamsEdit = z.infer<typeof CardEditSchema>;
export type CardParams = z.infer<typeof CardSchema>;
export type Card = CardParams & {
  id: number;
};
