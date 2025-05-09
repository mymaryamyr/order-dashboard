import { Suspense } from "react";
import { CleanedMockData } from "./server/mock";
import { MockSelectRow } from "./server/mock.types";
import Table from "./ui/table/page";
import { MultiSelect } from "./ui/multi-select/page";
import { SelectData } from "./ui/multi-select/page.constants";

export default async function Home(props: {
  searchParams?: Promise<Partial<MockSelectRow>>;
}) {
  const searchParams = await props.searchParams;

  // Normalize search params: remove undefined + convert to lowercase strings
  const normalizedParams: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value != null) {
      normalizedParams[key] = String(value).toLowerCase();
    }
  }

  const filteredData = CleanedMockData.filter((row) => {
    return Object.entries(normalizedParams).every(([key, searchValue]) => {
      const rowValue = row[key as keyof MockSelectRow];
      if (rowValue == null) return false;
      return String(rowValue).toLowerCase() === searchValue;
    });
  });

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <header className="flex flex-wrap items-center justify-between gap-4">
          {SelectData.map((select) => (
            <MultiSelect
              key={select.name}
              name={select.name}
              placeholder={select.placeholder}
              options={select.options}
            />
          ))}
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <Table data={filteredData} />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
