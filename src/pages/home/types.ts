import { BigNumber } from "@ethersproject/bignumber";

export type Course = {
  id: BigNumber;
  price: BigNumber;
  proof: string;
  owner: string;
  state: number;
};

export interface NormalizedCourse extends Omit<Course, "id" | "price"> {
  id: string;
  price: string;
}
