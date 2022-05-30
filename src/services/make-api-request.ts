import { AxiosRequestConfig, AxiosResponse } from "axios";

import { getInstance, isAxiosError } from "./axios";
import { ErrorResult } from "./types";

const axiosInstance = getInstance();

export const makeApiRequest = async <Response>(config: AxiosRequestConfig) => {
  try {
    const result = (await axiosInstance(config)) as AxiosResponse<Response>;

    return result.data;
  } catch (error) {
    // TODO config next lines in real project
    const errorObj: ErrorResult = {
      message: "Error",
      isError: true,
    };

    if (isAxiosError(error)) {
      errorObj.code = error.response?.status;

      if (error.response?.data) {
        const data = error.response?.data as { message?: ErrorResult["message"] };

        if (data.message) {
          errorObj.message = data.message;
        } else {
          errorObj.message = error.message;
        }
      } else {
        errorObj.message = error.message;
      }
    } else if (error instanceof Error && error.message) {
      errorObj.message = error.message;
    }

    return errorObj;
  }
};

export const isErrorResult = (result: unknown): result is ErrorResult => {
  return (
    typeof result === "object" &&
    result !== null &&
    "isError" in result &&
    (result as Record<string, unknown>).isError === true
  );
};
