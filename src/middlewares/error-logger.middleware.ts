import { Request, Response } from "express";
import { createLogger, format, transports } from "winston";

const { combine, json, prettyPrint, timestamp } = format;

const logger = createLogger({
   level: "error",
   format: combine(timestamp(), json(), prettyPrint()),
   transports: [new transports.File({ filename: "logs/error-logs.log" })]
});

export const errorLoggerMiddleware = (err: Error, req?: Request, res?: Response) => {
   logger.error({
      message: err.message || err.stack || "Internal Server Error",
      err: err,
      req: {
         url: req?.originalUrl,
         method: req?.method,
         params: req?.params,
         query: req?.query,
         body: req?.body
      },
      res: { status: res?.statusCode },
      timestamp: new Date()
   });
};
