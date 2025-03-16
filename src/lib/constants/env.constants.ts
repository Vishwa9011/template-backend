const envVariables = Object.freeze({
   PORT: process.env.PORT,
   NODE_ENV: process.env.NODE_ENV,
   MONGO_URI: process.env.MONGO_URI,
   UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
   UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN
} as const);

type EnvVariables = keyof typeof envVariables;

export const getEnv = (key: EnvVariables): string => {
   if (!envVariables[key]) {
      throw new Error(`❌ Missing env variable: "${key}". Set it in .env or system.`);
   }
   return envVariables[key];
};

// Validate required env variables at startup
Object.entries(envVariables).forEach(([key, value]) => {
   if (!value) throw new Error(`🚨 Startup error: "${key}" is missing. Set it in .env.`);
});
