import { MonthlyItem } from "../../../services/monthly-list/models/item";

export interface ProductItemListProps extends MonthlyItem {
  onRemove: (code: MonthlyItem['code']) => void;
  lastPrice?: number;
}
