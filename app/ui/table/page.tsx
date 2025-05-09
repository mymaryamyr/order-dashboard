"use client";
import { MockRow } from "@/app/server/mock.types";
import React, { useState } from "react";
import { Columns } from "./page.constants";

const Table = ({ data }: { data: MockRow[] }) => {
  const [sortKey, setSortKey] = useState<keyof MockRow | "">("");
  const [sortedData, setSortedData] = useState<MockRow[]>(data);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof MockRow) => {
    setSortKey(key);
    const multiplier = sortDirection === "asc" ? 1 : -1;
    console.log("Sorting in descending order", sortDirection);
    if (multiplier === 1) {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
    const finalSortedData = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return multiplier;
      if (a[key] > b[key]) return -multiplier;
      return 0;
    });
    setSortedData(finalSortedData);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            {Columns.map((col) => (
              <th
                key={col.accessor}
                className={`px-4 py-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-200 ${
                  sortKey === col.accessor ? "bg-gray-200" : "bg-transparent"
                }`}
                onClick={() => handleSort(col.accessor)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIdx) => (
            <tr key={rowIdx} className="even:bg-gray-50">
              {Columns.map((col) => (
                <td key={col.accessor} className="px-4 py-2 text-gray-800">
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
