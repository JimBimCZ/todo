import type { IApiError } from "../../types";

export const isCustomError = (err: any): err is IApiError => {
  return (
    (err as IApiError).error !== undefined &&
    (err as IApiError).status !== undefined
  );
};
