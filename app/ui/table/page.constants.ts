import { capitalize } from "@/lib/capitalize";
import { Column } from "./page.types";
import { MockKeysEnum, MockKeys } from "@/app/server/mock.types";

export const Columns: Column[] = MockKeys.map((key) => ({
  header: capitalize(MockKeysEnum[key]),
  accessor: key,
}));
