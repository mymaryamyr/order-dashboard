import { MockRow } from "@/app/server/mock.types";

export type Column = {
  header: string;
  accessor: keyof MockRow;
};
