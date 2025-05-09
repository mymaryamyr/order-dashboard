import { MockRow } from "../server/mock.types";

export type Column = {
  header: string;
  accessor: keyof MockRow;
};
