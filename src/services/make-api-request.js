import axios from "axios";

export const makeApiRequest = async config => {
  try {
    const result = await axios(config);

    return result;
  } catch (e) {
    // TODO config next lines in real project
    let message = "Error";
    if (axios.isAxiosError(e)) {
      message = e.response?.data.message || e.response?.data || e.message;
    } else if (e?.message) {
      message = e.message;
    } else if (typeof e === "string") {
      message = e;
    }
    return { error: { message } };
  }
};

export const isErrorResult = result => {
  return typeof result === "object" && result !== null && "error" in result;
};
