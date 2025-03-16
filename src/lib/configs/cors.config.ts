import { getEnv } from "../constants";
import { CorsOptionsDelegate, CorsRequest } from "cors";

const allowList = new Set(["http://localhost:5173"]);

const defaultCorsOptions = {
   credentials: true,
   allowedHeaders: ["Authorization", "Content-Type"]
};

export const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = async (req, callback) => {
   const environment = getEnv("NODE_ENV");
   const origin = req.headers.origin || "";

   if (environment !== "production") {
      return callback(null, { origin: true, ...defaultCorsOptions });
   }

   if (allowList.has(origin)) {
      return callback(null, { origin: true, ...defaultCorsOptions });
   }

   console.warn(`❌ CORS Blocked: ${origin}`);
   return callback(null, { origin: false, ...defaultCorsOptions }); // ✅ Always return a valid CORS response
};

// ✅ For WebSockets CORS (Socket.IO)
export const corsSocketOptions = {
   cors: {
      origin: Array.from(allowList),
      methods: ["GET", "POST"],
      credentials: true
   }
};
