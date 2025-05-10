import { MockDataRow } from "@/app/server/mock.types";

export function normalizeSearchParam(
  searchParams: Partial<MockDataRow> | undefined
): Record<string, string[]> {
  const normalizedParams: Record<string, string[]> = {};
  if (!searchParams) return normalizedParams;

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (Array.isArray(value)) {
      normalizedParams[key] = value.map((v) => v.toLowerCase());
    } else if (value) {
      normalizedParams[key] = [String(value).toLowerCase()];
    }
  }

  return normalizedParams;
}
