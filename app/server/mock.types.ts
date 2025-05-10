export enum MockKeysEnum {
  status = "Status",
  statusLeft = "status Left",
  statusRight = "status Right",
  type = "Type",
  lock = "Lock",
  customer = "Customer",
  daysSinceOrder = "Days Since Order",
  model = "Model",
  designer = "Designer",
  oid = "OID",
}

export const MockKeys: (keyof MockDataRow)[] = [
  "oid",
  "status",
  "type",
  "lock",
  "customer",
  "daysSinceOrder",
  "model",
  "designer",
];

export type MockDataRow = {
  oid: number;
  status: number;
  statusLeft: string;
  statusRight: string;
  type: string;
  lock: string;
  customer: string;
  daysSinceOrder: number;
  model: string;
  designer: string;
};

export type MockDataType = MockDataRow[];
