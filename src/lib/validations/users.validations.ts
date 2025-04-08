import { z } from "zod";

export const verifySignatureSchema = z.object({
   signature: z.string(),
   message: z.string()
});
