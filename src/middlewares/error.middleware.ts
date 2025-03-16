import { getEnv } from "@lib/constants";
import { ApiError, InternalError } from "@lib/utils";
import { NextFunction, Request, Response } from "express";
import { errorLoggerMiddleware } from "./error-logger.middleware";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
   const isDev = getEnv("NODE_ENV") === "development";

   errorLoggerMiddleware(err, req, res);

   // If it's an API-defined error, handle it
   if (err instanceof ApiError) {
      ApiError.handle(err, res);
      next();
      return;
   }

   // Default error message
   let errorMessage = "An unexpected error occurred.";

   // Handle Mongoose-specific errors
   if (err.name === "CastError") {
      errorMessage = "Resource not found.";
   } else if ((err as any).code === 11000) {
      errorMessage = "Duplicate field value entered.";
   } else if (err.name === "ValidationError") {
      errorMessage = Object.values((err as any).errors)
         .map((val: any) => val.message)
         .join(", ");
   }

   // In development, return full error details
   if (isDev) {
      res.status(500).json({ error: err.message, stack: err.stack });
      next();
      return;
   }

   // Handle general/internal errors
   ApiError.handle(new InternalError(errorMessage), res);
   next();
};
