import { asyncHandler, NotFoundResponse, SuccessResponse } from "@/lib/utils";

export const healthCheck = asyncHandler(async (req, res) => {
   new SuccessResponse({}, "Health check passed").send(res);
});

export const routeNotFound = asyncHandler(async (req, res) => {
   new NotFoundResponse("Route not found").send(res);
})