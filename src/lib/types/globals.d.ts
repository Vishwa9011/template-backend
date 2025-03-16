import * as express from "express";
import { UserSession } from "../utils";

// adding extra properties to the Request object
declare global {
   namespace Express {
      interface Request {
         user: UserSession | null;
      }
   }
}
