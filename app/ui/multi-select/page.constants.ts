import { CleanedMockData } from "@/app/server/mock";
import { SelectType } from "./page.types";
import { getStatusText } from "@/lib/get-status-text";
import { MockKeysEnum, MockSelectKeys } from "@/app/server/mock.types";

export const SelectData: SelectType[] = MockSelectKeys.map((key) => ({
  name: key,
  placeholder: `Filter by ${MockKeysEnum[key]}`,
  options: [...new Set(CleanedMockData.map((row) => row[key]))].map((d) => {
    if (key === "status") {
      return {
        value: d.toString(),
        label: getStatusText(d as number).toString() || "",
      };
    } else {
      return {
        value: d.toString(),
        label: d.toString(),
      };
    }
  }),
}));
