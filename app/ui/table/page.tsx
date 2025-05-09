"use client";
import { MockSelectRow } from "@/app/server/mock.types";
import React, { useEffect, useState } from "react";
import { Columns } from "./page.constants";
import { getStatusText } from "@/lib/get-status-text";

const Table = ({ data }: { data: MockSelectRow[] }) => {
  const [sortKey, setSortKey] = useState<keyof MockSelectRow | "">("");
  const [sortedData, setSortedData] = useState<MockSelectRow[]>(data);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // when URL changes
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  console.log("data", data);

  const handleSort = (key: keyof MockSelectRow) => {
    setSortKey(key);
    const multiplier = sortDirection === "asc" ? 1 : -1;
    if (multiplier === 1) {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
    const finalSortedData = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return -multiplier;
      if (a[key] > b[key]) return multiplier;
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
            <tr key={rowIdx} className="even:bg-gray-50 hover:bg-blue-200">
              {Columns.map((col) => {
                if (col.accessor === "status") {
                  return (
                    <td
                      key={col.accessor}
                      className="flex flx-col px-4 py-2 gap-2 text-gray-800"
                    >
                      <div className="basis-1/2">
                        {getStatusText(row[col.accessor])}
                      </div>
                      <div className="flex flex-col basis-1/2 text-xs text-gray-500">
                        <div className="flex justify-between">
                          <span>{row["statusLeft"]}</span>
                          <span>L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{row["statusRight"]}</span>
                          <span>R</span>
                        </div>
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td key={col.accessor} className="px-4 py-2 text-gray-800">
                      {row[col.accessor]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
