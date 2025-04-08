import { UserRole } from "@/models";
import { COOKIE_SESSION_KEY } from "@/lib/utils";
import { asyncHandler, AuthFailureError, getUserSessionById } from "@/lib/utils";

export const checkForAuthorization = asyncHandler(async (req, res, next) => {
   const sessionId = req.cookies[COOKIE_SESSION_KEY];
   if (!sessionId) return next();
   req.user = null;

   const user = await getUserSessionById(sessionId);
   if (user) req.user = user;
   next();
});

export const restrictTo = (...roles: UserRole[]) =>
   asyncHandler(async (req, res, next) => {
      if (!req.user) throw new AuthFailureError();
      if (!roles.includes(req.user.role)) throw new AuthFailureError("You are not authorized to perform this action");
      next();
   });
