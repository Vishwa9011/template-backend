import { asyncHandler, SuccessResponse } from "@/lib/utils";

export const healthCheck = asyncHandler(async (req, res) => {
   new SuccessResponse({}, "Health check passed").send(res);
});
