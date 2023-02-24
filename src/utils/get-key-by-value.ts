// TODO remove if not used

export const getKeyByValue = <T extends { [key: string]: any }>(object: T, value: any) => {
  return Object.keys(object).find(key => object[key] === value);
};
