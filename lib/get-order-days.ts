export const orderDayRanges = [
  { label: "<5", value: "5" },
  { label: "<15", value: "15" },
  { label: "<30", value: "30" },
  { label: "<60", value: "60" },
];

export function getOrderDayLabels(order: number): string[] {
  return orderDayRanges
    .filter((r) => order < Number(r.value))
    .map((r) => r.value.toLowerCase());
}
