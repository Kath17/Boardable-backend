import { ZodIssue } from "zod";

export function formatIssues(issues: ZodIssue[]) {
  const formattedIssues: Record<string, string> = {};

  issues.forEach((issue) => {
    formattedIssues[issue.path.join(".")] = issue.message;
  });

  return formattedIssues;
}
