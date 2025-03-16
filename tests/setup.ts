import "@lib/configs/env.config";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

beforeAll(async () => {
   mongo = await MongoMemoryServer.create();
   const mongoUri = mongo.getUri();
   await mongoose.connect(mongoUri);
});

afterAll(async () => {
   await mongoose.connection.dropDatabase();
   await mongoose.connection.close();
   await mongo.stop();
});
