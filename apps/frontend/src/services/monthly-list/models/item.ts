export interface MonthlyItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
  lastPrice?: number;
}

export interface MonthlySketchedItem {
  code: MonthlySketchedItemValue;
  name: MonthlySketchedItemValue;
  price: MonthlySketchedItemValue<number>;
  quantity: MonthlySketchedItemValue<number>;
  lastPrice?: MonthlySketchedItemValue<number>;
}

interface MonthlySketchedItemValue<T = string> {
  value: T;
  error?: string;
}