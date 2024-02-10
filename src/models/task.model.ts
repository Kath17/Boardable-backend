import { z } from "zod";

export const TaskSchema = z.object({
  task: z
    .string({
      required_error: "Task is required",
      invalid_type_error: "Task must be a string",
    })
    .min(1, "Task must have at least 1 character"),
  user_id: z.number().int().positive().optional(),
  board_id: z.number().int().positive().optional(),
  card_id: z.number().int().positive().optional(),
});

export const TaskEditSchema = TaskSchema.partial();

export type TaskParamsEdit = z.infer<typeof TaskEditSchema>;
export type TaskParams = z.infer<typeof TaskSchema>;
export type Task = TaskParams & {
  id: number;
};
