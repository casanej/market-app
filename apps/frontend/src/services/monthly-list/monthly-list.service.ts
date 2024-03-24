import { makeAutoObservable, observable } from "mobx"
import { ZodError, z } from 'zod';
import { MonthlyItem, MonthlySketchedItem } from "./models/item";
import { DEFAULT_ITEM } from "./constants/item";

export class MonthlyListService {
  private LIST_NAME = 'monthly-list';
  total: number = 0;
  items: MonthlyItem[] = [];
  item: MonthlySketchedItem = Object.assign({}, DEFAULT_ITEM);

  constructor(listName?: string) {
    makeAutoObservable(this, {
      item: observable.deep,
    }, {
      autoBind: true,
    });

    if (listName) this.LIST_NAME = listName.toUpperCase();
    this.loadList();

  }

  /* SKETCH ITEM EDIT */
  public sketchItemAdd() {
    try {
      /* z.object({
        code: z.string().min(1),
        name: z.string().min(3),
        price: z.number().min(0),
        quantity: z.number().min(1),
      }).parse({
        code: this.item.code.value,
        name: this.item.name.value,
        price: this.item.price.value,
        quantity: this.item.quantity.value,
      }); */

      this.items.push({
        code: this.item.code.value,
        name: this.item.name.value,
        price: this.item.price.value,
        quantity: this.item.quantity.value,
        lastPrice: this.item.lastPrice?.value,
      });
      this.addTotal(this.item.price.value, this.item.quantity.value);
      this.sketchItemReset();
      this.saveList();
    } catch (err) {
      const zodErrors = (err as ZodError).errors;
      for (const error of zodErrors) {
        const key = error.path[0] as keyof MonthlySketchedItem;
        this.item[key]!.error = error.message;
      }
    }

    return this;
  }

  public sketchItemReset() {
    this.item = DEFAULT_ITEM;
    return this;
  }

  public sketchItemEdit(key: keyof MonthlyItem, value: string | number) {
    if (key === 'code') this.item.code.value = value as string;
    if (key === 'name') this.item.name.value = value as string;
    if (key === 'price') this.item.price.value = value as number;
    if (key === 'quantity') this.item.quantity.value = value as number;
  }

  public sketchValidateField(key: keyof MonthlyItem) {
    if (key === 'price') {
      try {
        z.number().min(0).parse(this.item.price.value);
        this.item.price.error = '';
      } catch (err) {
        const zodError = err as ZodError;
        this.item.price.error = zodError.errors[0].message;

      }
    }
    if (key === 'quantity') {
      if (this.item.quantity.value < 1) this.item.quantity.error = 'Quantidade inválida';
      else this.item.quantity.error = '';
    }
  }

  addTotal(price: number, quantity: number) {
    this.total += price * quantity;
  }

  /* ------------- */

  /* SAVE ITEMS ON LOCAL STORAGE */
  public saveList() {
    const listData = {
      total: this.total,
      items: this.items,
    };

    localStorage.setItem(`SAVED_LIST_${this.LIST_NAME}`, JSON.stringify(listData));
  }

  public loadList() {
    const listData = localStorage.getItem(`SAVED_LIST_${this.LIST_NAME}`);
    if (!listData) return;

    const { total, items } = JSON.parse(listData);
    this.total = total;
    this.items = items;
  }
  /* ------------------------ */

  public editItem(key: keyof MonthlyItem, value: any) {
    if (key === 'name') this.item.name = value;
    if (key === 'price') {
      this.item.price = value;
    }
    if (key === 'quantity') {
      this.item.quantity = value;
    }

    this.saveList();
  }

  public removeItem(code: string) {
    const itemIndex = this.items.findIndex(item => item.code === code);

    if (itemIndex === -1) return;

    const item = this.items[itemIndex];
    this.total -= item.price * item.quantity;
    this.items.splice(itemIndex, 1);

    this.saveList();
  }
}

export type IMonthlyListService = MonthlyListService;
export const monthlyListService = new MonthlyListService();