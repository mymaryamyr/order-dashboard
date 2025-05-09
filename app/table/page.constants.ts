import { MockKeys } from "../server/mock";
import { capitalize } from "../utils/capitalize";
import { Column } from "./page.types";

export const Columns: Column[] = MockKeys.map((key) => ({
  header: capitalize(key),
  accessor: key,
}));
