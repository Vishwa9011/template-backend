import Joi from "joi";
import crypto from "crypto";
import { IUser } from "@/models";
import { Response } from "express";
import { redisClient } from "../configs";
import { BadRequestError } from "./api-error";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
export const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = Joi.object<UserSession>({
   _id: Joi.string().required(),
   role: Joi.string().valid("USER", "ADMIN").required()
});

export type UserSession = {
   _id: string;
   role: IUser["role"];
};

export async function getUserSessionById(sessionId: string) {
   const user = await redisClient.get(`session:${sessionId}`);
   if (!user) return null;

   const { error, value } = sessionSchema.validate(user);
   return error ? null : (value as UserSession);
}

export async function createUserSession(user: UserSession, res: Response) {
   const sessionId = crypto.randomUUID();

   const { error, value } = sessionSchema.validate(user);
   if (error) throw new BadRequestError(`Invalid user session: ${error.message}`);

   await redisClient.set(`session:${sessionId}`, value, {
      ex: SESSION_EXPIRATION_SECONDS
   });

   setCookie(sessionId, res);
}

export async function removeUserFromSession(sessionId: string, res: Response) {
   await redisClient.del(`session:${sessionId}`);
   res.clearCookie(COOKIE_SESSION_KEY);
}

export function setCookie(sessionId: string, res: Response) {
   res.cookie(COOKIE_SESSION_KEY, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_EXPIRATION_SECONDS * 1000
   });
}
