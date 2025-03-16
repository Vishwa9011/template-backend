import cors from "cors";
import helmet from "helmet";
import express from "express";
import { userRouter } from "./routes";
import cookieParser from "cookie-parser";
import { healthCheck } from "./controllers";
import { corsOptionsDelegate } from "./lib/configs/cors.config";
import { checkForAuthorization, errorMiddleware, morganMiddleware } from "@/middlewares";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morganMiddleware);
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(checkForAuthorization);

app.get("/health", healthCheck);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware);

export default app;
