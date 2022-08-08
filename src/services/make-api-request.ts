import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { getInstance, isAxiosError } from "./axios";
import { ErrorResult } from "./types";
import { toastError } from "configs";

const axiosInstance = getInstance();

export const makeApiRequest = async <Response>({ isShowError = true, ...config }) => {
  try {
    const result = (await axiosInstance(config)) as AxiosResponse<Response>;

    return result.data;
  } catch (error) {
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

    if (isShowError) {
      toast.error(`${errorObj.message}`, toastError);
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
