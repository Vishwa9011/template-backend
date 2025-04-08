import "@lib/configs/env.config";
import request from "supertest";
import server from "../src/app"; // ✅ Import your Express app

export const baseUrl = "/api/v1/users";

describe("Auth API", () => {
   it("should get nonce", async () => {
      const res = await request(server).get("/api/v1/users/nonce").send();
      expect(res.statusCode).toBe(200);
   });

   it("should verify user", async () => {
      const res = await request(server).post(`${baseUrl}/verify`).send({});
      expect(res.statusCode).toBe(400);
   });
});
