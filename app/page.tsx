import { Suspense } from "react";
import Select from "./ui/select";
import Table from "./table/page";

type DataRow = {
  name: string;
  role: string;
  email: string;
  status: string;
};

const selectData = [
  {
    name: "role",
    placeholder: "Filter by role",
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
      { value: "manager", label: "Manager" },
    ],
  },
  {
    name: "status",
    placeholder: "Filter by status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
];

const data: DataRow[] = [
  {
    name: "John Doe",
    role: "Admin",
    email: "something@gmail.com",
    status: "active",
  },
  { name: "sefawf", role: "User", email: "User@gmail.com", status: "active" },
  {
    name: "Jofffsss",
    role: "User",
    email: "fsdfaF@gmail.com",
    status: "blocked",
  },
];

export default async function Home(props: {
  searchParams?: Promise<{
    role?: string;
    status?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const roleParam = searchParams?.role?.toLowerCase();
  const statusParam = searchParams?.status?.toLowerCase();

  const filteredData = data.filter((row) => {
    const matchRole = roleParam ? row.role.toLowerCase() === roleParam : true;
    const matchStatus = statusParam
      ? row.status?.toLowerCase() === statusParam
      : true;
    return matchRole && matchStatus;
  });

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        {selectData.map((select) => (
          <Select
            key={select.name}
            name={select.name}
            placeholder={select.placeholder}
            options={select.options}
          />
        ))}
        <Suspense fallback={<div>Loading...</div>}>
          <Table data={filteredData} />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
