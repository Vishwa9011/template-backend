import { Router } from "express";
import { restrictTo } from "@/middlewares";
import * as controllers from "@/controllers";
import { validateBody } from "@/middlewares/validate-body.middleware";
import { verifySignatureSchema } from "@/lib/validations";

export const userRouter = Router();

userRouter.get("/me", restrictTo("USER", "ADMIN"), controllers.getMe);

userRouter.get("/nonce", controllers.getNonce);

userRouter.post("/verify", validateBody(verifySignatureSchema), controllers.verifySignature);

userRouter.post("/logout", controllers.logout);
