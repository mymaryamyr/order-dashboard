import { Suspense } from "react";
import { CleanedMockData } from "./server/mock";
import { MockSelectRow } from "./server/mock.types";
import Table from "./ui/table/page";
import { MultiSelect } from "./ui/multi-select/page";
import { SelectData } from "./ui/multi-select/page.constants";
import Image from "next/image";
import { getOrderDayLabels, orderDayRanges } from "@/lib/get-order-days";

export default async function Home(props: {
  searchParams?: Promise<Partial<MockSelectRow>>;
}) {
  const searchParams = await props.searchParams;

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

  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white font-[family-name:var(--font-geist-sans)]">
      <header className="w-full h-20 flex items-center px-6 bg-gray-100 dark:bg-zinc-800 border-b">
        <a
          className="flex items-center gap-4"
          href="https://www.zellerfeld.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/logo.svg" alt="Zellerfeld" width={35} height={35} />
          <Image
            src="/text-logo.svg"
            alt="Zellerfeld"
            width={120}
            height={20}
          />
        </a>
      </header>
      <main className="px-4 sm:px-8 py-6 flex flex-col gap-6">
        <section className="flex flex-wrap gap-4 items-start p-4 rounded-md border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 shadow-sm">
          {SelectData.map((select) => (
            <MultiSelect
              key={select.name}
              name={select.name}
              placeholder={select.placeholder}
              options={
                select.name === "daysSinceOrder"
                  ? orderDayRanges
                  : select.options
              }
            />
          ))}
        </section>

        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <Table data={filteredData} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
