import { useMemo } from "react";
import { PaginationProps } from "./index.type";

export const Pagination = ({ current, onPageChange, maxPages }: PaginationProps) => {

  const renderPagesNumber = useMemo(() => {
    const pages = Array.from({ length: maxPages }, (_, index) => index + 1);

    return pages.map((page) => {
      return <button key={page} onClick={() => onPageChange(page)}>{page}</button>;
    });
  }, [current, maxPages]);

  return <div>
    {renderPagesNumber}
  </div>;
};
