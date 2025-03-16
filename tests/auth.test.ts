import "@lib/configs/env.config";
import request from "supertest";
import server from "../src/app"; // ✅ Import your Express app

describe("Auth API", () => {
   it("should get nonce", async () => {
      const res = await request(server).get("/api/v1/users/nonce").send();
      console.log("res: ", res.body);
      expect(res.statusCode).toBe(200);
   });
});
