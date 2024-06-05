export interface PaginationProps {
  current: number;
  maxPages: number;
  onPageChange: (page: number) => void;
}