import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export const getErrorMessage = (
  error?: FetchBaseQueryError | SerializedError,
): string => {
  if (!error) return "Failed to contact server :(";

  if ("status" in error && "data" in error) {
    // FetchBaseQueryError
    return typeof error.status === "string" ? error.status : "Error occurred";
  }

  if ("message" in error) {
    // SerializedError
    return error.message ? error.message : error.toString();
  }

  return "Unknown error - there seems to be a problem contacting the server";
};
