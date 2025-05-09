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
  const normalizedParams: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (Array.isArray(value)) {
      normalizedParams[key] = value.map((v) => v.toLowerCase());
    } else if (value) {
      normalizedParams[key] = [String(value).toLowerCase()];
    }
  }

  const filteredData = CleanedMockData.filter((row) => {
    return Object.entries(normalizedParams).every(([key, values]) => {
      const rowValue = row[key as keyof MockSelectRow];
      if (rowValue == null) return false;
      return values.includes(String(rowValue).toLowerCase());
    });
  });

  return (
    <div className="min-h-screen p-2 pb-20 gap-1 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <header>Zellerfeld</header>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {SelectData.map((select) => (
            <MultiSelect
              key={select.name}
              name={select.name}
              placeholder={select.placeholder}
              options={select.options}
            />
          ))}
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Table data={filteredData} />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
