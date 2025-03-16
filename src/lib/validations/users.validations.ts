import Joi from "joi";

export const verifySignatureSchema = Joi.object({
   signature: Joi.string().required(),
   message: Joi.string().required()
});
