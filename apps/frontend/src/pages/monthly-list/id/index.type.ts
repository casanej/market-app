import { IMonthlyListService } from "../../../services/monthly-list/monthly-list.service";

export interface MonthlyListPageProps {
  service: IMonthlyListService;
}

export interface GetListProps {
  page: number;
  pageSize: number;
}