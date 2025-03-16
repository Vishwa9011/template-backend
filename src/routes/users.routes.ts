import { Router } from "express";
import { restrictTo } from "@/middlewares";
import * as controllers from "@/controllers";

export const userRouter = Router();

userRouter.get("/me", restrictTo("USER", "ADMIN"), controllers.getMe);

userRouter.get("/nonce", controllers.getNonce);

userRouter.post("/verify", controllers.verifySignature);

userRouter.post("/logout", controllers.logout);
