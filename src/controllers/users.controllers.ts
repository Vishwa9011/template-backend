import { User } from "@/models";
import * as utils from "@/lib/utils";
import { createUserSession } from "@/lib/utils";
import { generateNonce, SiweMessage } from "siwe";
import { generateUsername } from "unique-username-generator";

export const getMe = utils.asyncHandler(async (req, res) => {
   const user = await User.findById(req.user!._id);
   if (!user) throw new utils.NotFoundError("User not found");
   new utils.SuccessResponse({ ...user?.toJSON() }, "User found successfully").send(res);
});

export const getNonce = utils.asyncHandler(async (req, res) => {
   const nonce = generateNonce();
   new utils.SuccessResponse({ nonce }, "Nonce generated successfully").send(res);
});

export const verifySignature = utils.asyncHandler(async (req, res) => {
   const { message, signature } = req.body;
   const siweMessage = new SiweMessage(message);

   const { success, data } = await siweMessage.verify({ signature });
   if (!success) throw new utils.AuthFailureError("Invalid signature");

   const address = data.address;

   let user = await User.findOne({ address });
   if (!user) {
      const username = generateUsername("", 2, 20);
      user = await User.create({ address, username });
   }

   const { _id, role } = user.toJSON();
   await createUserSession({ _id: String(_id), role }, res);
   new utils.SuccessResponse({ ...user.toJSON() }, "Signature verified successfully").send(res);
});

export const logout = utils.asyncHandler(async (req, res) => {
   const sessionId = req.cookies[utils.COOKIE_SESSION_KEY];
   if (!sessionId) throw new utils.BadRequestError("No session found");

   await utils.removeUserFromSession(sessionId, res);
   new utils.SuccessResponse({}, "Logged out successfully").send(res);
});
