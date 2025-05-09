import { capitalize } from "@/app/utils/capitalize";
import { Column } from "./page.types";
import { MockKeys, MockKeysEnum } from "@/app/server/mock";

export const Columns: Column[] = MockKeys.map((key) => ({
  header: capitalize(MockKeysEnum[key]),
  accessor: key,
}));
