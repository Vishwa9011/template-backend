import "module-alias/register";
import "@lib/configs/env.config";

import server from "./app";
import { getEnv } from "@lib/constants";
import { connectToDatabase } from "@lib/configs";

server.listen(getEnv("PORT"), async () => {
   await connectToDatabase();
   console.log(`✅ Server is running on port http://localhost:${getEnv("PORT")}`);
});

process.on("unhandledRejection", err => {
   console.error("🔥 Unhandled Rejection:", err);
   process.exit(1);
});

process.on("uncaughtException", err => {
   console.error("🔥 Uncaught Exception:", err);
   process.exit(1);
});
