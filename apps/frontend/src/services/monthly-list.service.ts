import { makeAutoObservable } from "mobx"

export class MonthlyListService {
  total: number = 0;
  items: { name: string, value: number }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public addItem(name: string, value: number) {
    this.total += value;
    this.items.push({ name, value });
  }
}

export type IMonthlyListService = MonthlyListService;
//export const monthlyListService = new MonthlyListService();
export const monthlyListService = new MonthlyListService();