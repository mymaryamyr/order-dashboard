import { MockDataRow } from "@/app/server/mock.types";

export type SelectType = {
  name: keyof MockDataRow;
  placeholder: string;
  options: { value: string; label: string }[];
};
