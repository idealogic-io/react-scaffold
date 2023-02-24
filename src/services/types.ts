export type ErrorResult = { message: string; code?: number; isError: boolean; errors?: ErrorInErrorsArrayFromBE[] };

export type ErrorInErrorsArrayFromBE = {
  property: string;
  children: ErrorInErrorsArrayFromBE[];
  constraints: { [key: string]: string };
  value: string;
};
