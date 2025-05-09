import { MockSelectRow } from "@/app/server/mock.types";

export type Column = {
  header: string;
  accessor: keyof MockSelectRow;
};
