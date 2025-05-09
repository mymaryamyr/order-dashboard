import { capitalize } from "@/app/utils/capitalize";
import { Column } from "./page.types";
import { MockKeysEnum, MockSelectKeys } from "@/app/server/mock.types";

export const Columns: Column[] = MockSelectKeys.map((key) => ({
  header: capitalize(MockKeysEnum[key]),
  accessor: key,
}));
