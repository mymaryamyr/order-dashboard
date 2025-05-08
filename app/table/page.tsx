import React from "react";

type DataRow = {
  name: string;
  role: string;
  email: string;
  status: string;
};

type Column = {
  header: string;
  accessor: keyof DataRow;
};

const columns: Column[] = [
  { header: "Name", accessor: "name" },
  { header: "Role", accessor: "role" },
  { header: "Email", accessor: "email" },
];

const Table = ({ data }: { data: DataRow[] }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-2 font-medium text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="even:bg-gray-50">
              {columns.map((col) => (
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
