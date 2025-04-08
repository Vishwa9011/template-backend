import z from "zod";
import crypto from "crypto";
import { userRoles } from "@/models";
import { Response } from "express";
import { redisClient } from "../configs";
import { BadRequestError } from "./api-error";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
export const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
   _id: z.string(),
   role: z.enum(userRoles)
});

type UserSession = z.infer<typeof sessionSchema>;

export async function getUserSessionById(sessionId: string) {
   const rawUser = await redisClient.get(`session:${sessionId}`);
   if (!rawUser) return null;

   const { success, data: user } = sessionSchema.safeParse(rawUser);
   return success ? (user as UserSession) : null;
}

export async function createUserSession(user: UserSession, res: Response) {
   const sessionId = crypto.randomUUID();

   await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
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
