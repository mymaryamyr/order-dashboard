import { CleanedMockData } from "@/app/server/mock";
import Table from "./page";
import { getOrderDayLabels } from "@/lib/get-order-days";
import { MockSelectRow } from "@/app/server/mock.types";

const TableWrapper = ({
  normalizedParams,
}: {
  normalizedParams: Record<string, string[]>;
}) => {
  const filteredData = CleanedMockData.filter((row) => {
    return Object.entries(normalizedParams).every(([key, values]) => {
      const searchValues = values.map((v) => v.toLowerCase());
      const rawValue = row[key as keyof MockSelectRow];

      if (rawValue == null) return false;

      let rowValues: string[] = [];

      if (key === "daysSinceOrder") {
        rowValues = getOrderDayLabels(rawValue as number);
      } else {
        rowValues = [String(rawValue).toLowerCase()];
      }

      return rowValues.some((val) => searchValues.includes(val));
    });
  });

  return <Table data={filteredData} />;
};

export default TableWrapper;
