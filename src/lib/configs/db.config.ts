import mongoose from "mongoose";
import { getEnv } from "../constants";

export const connectToDatabase = async () => {
   try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(getEnv("MONGO_URI"));
      console.log(`✅ Connected to database ${getEnv("NODE_ENV")} mode`);
   } catch (error) {
      console.log("Error connecting to database", error);
      process.exit(1);
   }
};
