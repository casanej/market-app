import { makeAutoObservable } from "mobx"
import { MonthlyItem } from "./models/item";

export class MonthlyListService {
  total: number = 0;
  items: MonthlyItem[] = [];
  // item: MonthlyItem;

  constructor() {
    makeAutoObservable(this);
  }

  public addItem(code: string, name: string, value: number, quantity: number = 1) {
    this.total += value * quantity;
    this.items.push({ code, name, value, quantity });
  }
}

export type IMonthlyListService = MonthlyListService;
export const monthlyListService = new MonthlyListService();