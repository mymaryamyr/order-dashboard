import { Suspense } from "react";
import { MockDataRow } from "./server/mock.types";
import { MultiSelect } from "./ui/multi-select/page";
import { SelectData } from "./ui/multi-select/page.constants";
import { orderDayRanges } from "@/lib/get-order-days";
import TableWrapper from "./ui/table/table-wrapper";
import { normalizeSearchParam } from "@/lib/normalize-search-param";
import Header from "./ui/header/page";

export default async function Home(props: {
  searchParams?: Promise<Partial<MockDataRow>>;
}) {
  // get and normalize searchParams to do filtering in TableWrapper
  const searchParams = await props.searchParams;
  const normalizedParams = normalizeSearchParam(searchParams);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white font-[family-name:var(--font-geist-sans)]">
      <Header />

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
          <Suspense
            fallback={<div className="p-4 text-gray-500">Loading...</div>}
          >
            <TableWrapper normalizedParams={normalizedParams} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
