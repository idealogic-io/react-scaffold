import { getInstance, isAxiosError } from "./axios";

const axiosInstance = getInstance();

export const makeApiRequest = async config => {
  try {
    const result = await axiosInstance(config);

    return result.data;
  } catch (error) {
    // TODO config next lines in real project
    const errorObj = {
      message: "Error",
      isError: true,
    };

    if (isAxiosError(error)) {
      errorObj.code = error.response?.status;

      if (error.response?.data) {
        const data = error.response?.data;

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

export const isErrorResult = result => {
  return typeof result === "object" && result !== null && "isError" in result && result.isError === true;
};
