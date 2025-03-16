import http from "http";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { userRouter } from "./routes";
import cookieParser from "cookie-parser";
import * as controllers from "./controllers";
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

app.use("/api/v1/users", userRouter);

// Health check
app.get("/health", controllers.healthCheck);
app.use("*", controllers.routeNotFound);

app.use(errorMiddleware);

const server = http.createServer(app);

server.timeout = 60 * 5 * 1000; // 5 minutes

export default server;
