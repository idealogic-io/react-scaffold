import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { getInstance, isAxiosError } from "./axios";
import { ErrorResult } from "./types";
import { toastOptionsError } from "components";
import { parseErrorFromBE } from "utils/helpers";
import { LOCAL_STORAGE_KEYS } from "configs";
import { t } from "context/language-context";

const axiosInstance = getInstance();
const locale = localStorage.getItem(LOCAL_STORAGE_KEYS.language);
const translate = t(locale);

export const makeApiRequest = async <Response>({ isShowError = true, ...config }) => {
  try {
    const result = (await axiosInstance({ ...config })) as AxiosResponse<Response>;

    return result.data;
  } catch (error) {
    const errorObj: ErrorResult = {
      message: "Error",
      isError: true,
    };

    if (isAxiosError(error)) {
      errorObj.code = error.response?.status;

      if (error.response?.data) {
        const data = error.response?.data as { message?: ErrorResult["message"]; errors?: ErrorResult["errors"] };

        if (data.message) {
          errorObj.message = data.message;

          if (data.errors && Array.isArray(data.errors) && data.errors.length) {
            errorObj.message = parseErrorFromBE(data.errors);
          }
        } else {
          errorObj.message = replaceWithNewErrorMessages(error);
        }
      } else {
        errorObj.message = replaceWithNewErrorMessages(error);
      }
    } else if (error instanceof Error && error.message) {
      errorObj.message = replaceWithNewErrorMessages(error);
    }

    if (isShowError) {
      if (errorObj.code !== 401) {
        toast.error(`${errorObj.message}`, toastOptionsError);
      }
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

const replaceWithNewErrorMessages = (error: unknown) => {
  if ((error as { code: string })?.code === "ERR_NETWORK") {
    return `${translate("Server is not responding.")} ${translate("Check the internet connection and try again.")}`;
  } else if ((error as { code: string })?.code === "ECONNABORTED") {
    return `${translate("Your request exceeded the time limit for processing.")} ${translate(
      "Check the internet connection and try again.",
    )}`;
  } else return (error as { message: string }).message;
};
