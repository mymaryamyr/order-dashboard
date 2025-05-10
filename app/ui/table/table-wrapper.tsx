import { CleanedMockData } from "@/app/server/mock";
import { getOrderDayLabels } from "@/lib/get-order-days";
import { MockDataRow, MockDataType } from "@/app/server/mock.types";
import Table from "./table";

const TableWrapper = ({
  normalizedParams,
}: {
  normalizedParams: Record<string, string[]>;
}) => {
  // filtering data on the server in order to have a faster UX
  const filteredData: MockDataType = CleanedMockData.filter((row) => {
    return Object.entries(normalizedParams).every(([key, values]) => {
      const searchValues = values.map((v) => v.toLowerCase());
      const rawValue = row[key as keyof MockDataRow];

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
