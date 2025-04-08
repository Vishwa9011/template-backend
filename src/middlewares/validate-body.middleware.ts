import { ZodSchema } from "zod";
import { asyncHandler, ValidationError } from "@/lib/utils";

export const validateBody = (schema: ZodSchema) =>
   asyncHandler(async (req, _, next) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
         const prettyErrors = result.error.issues
            .map(issue => {
               const path = issue.path.join(".");
               return `${path}: ${issue.message}`;
            })
            .join(", ");
         throw new ValidationError(prettyErrors);
      }

      next();
   });
