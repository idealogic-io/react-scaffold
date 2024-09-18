export type DefaultResponseList<T> = {
  data: T[];
  count: number;
  pending: boolean;
  total?: number;
};
