import { MockSelectRow } from "@/app/server/mock.types";

export type SelectType = {
  name: keyof MockSelectRow;
  placeholder: string;
  options: { value: string; label: string }[];
};
