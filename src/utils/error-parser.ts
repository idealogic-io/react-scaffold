type AnyObject = {
  [key: string]: any;
};
// TODO
function parseError(data: AnyObject) {
  let errString = "";
  console.log(data);

  Object.keys(data).forEach(key => {
    /**
     * Parse error depends on type
     */
    if (Array.isArray(data[key])) {
      const arr = data[key];

      /**
       * IF   - have array of strings - join it
       * ELSE - have array of objects - run parsing recursively
       */
      let allValuesIsAString = arr.every((el: unknown) => typeof el === "string");

      if (arr.length && allValuesIsAString) {
        errString += `${data[key].join(". ")}`;
      }
    } else if (typeof data[key] === "string") {
      errString += data[key];
    } else if (typeof data[key] === "object") {
      errString += parseError(data[key]);
    }
  });

  return errString;
}

export function parseErrorFromBE(err: unknown | string) {
  if (typeof err === "object") {
    return parseError(err as AnyObject);
  }

  if (typeof err === "string") {
    return err;
  }

  return "";
}
