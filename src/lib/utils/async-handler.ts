import { NextFunction, Request, Response } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void | any>;

export const asyncHandler = (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
   return Promise.resolve(execution(req, res, next)).catch(next);
};
