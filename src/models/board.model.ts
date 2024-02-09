import { z } from "zod";

export const BoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title must have at least 1 character"),
  color: z
    .string({
      invalid_type_error: "Color must be a string",
    })
    .min(7, "Color must have exactly 7 characters")
    .refine((value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value), {
      message:
        "Invalid color format. Must be a valid hex color code (e.g., #FFFFFF).",
    })
    .default("#E2E8F0"),
  created_date: z
    .string({
      invalid_type_error: "CreatedAt should be a Date",
    })
    .optional(),
  user_id: z.number().int().positive().optional(),
});

export const BoardEditSchema = BoardSchema.partial();

export type BoardParamsEdit = z.infer<typeof BoardEditSchema>;
export type BoardParams = z.infer<typeof BoardSchema>;
export type Board = BoardParams & {
  id: number;
};
