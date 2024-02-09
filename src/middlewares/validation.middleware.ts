import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

type ZodSchema<T> = Schema<T>;

export function validationMiddleware<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = schema.parse(req.body);
      req.body = body;
      next();
    } catch (error) {
      next(error);
    }
  };
}
