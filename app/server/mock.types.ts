export type MockRow = {
  oid: number;
  statusLeft: string;
  statusRight: string;
  type: string;
  lock: string;
  customer: string;
  daysSinceOrder: number;
  model: string;
  designer: string;
};

export type SelectType = {
  name: keyof MockRow;
  placeholder: string;
  options: { value: string; label: string }[];
};
