import { Redis } from "@upstash/redis";
import { getEnv } from "../constants";

export const redisClient = new Redis({
   url: getEnv("UPSTASH_REDIS_REST_URL"),
   token: getEnv("UPSTASH_REDIS_REST_TOKEN")
});
