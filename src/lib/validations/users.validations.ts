<<<<<<< HEAD
import Joi from "joi";

export const verifySignatureSchema = Joi.object({
   signature: Joi.string().required(),
   message: Joi.string().required()
=======
import { z } from "zod";

export const verifySignatureSchema = z.object({
   signature: z.string(),
   message: z.string()
>>>>>>> 201266f (validation library change)
});
