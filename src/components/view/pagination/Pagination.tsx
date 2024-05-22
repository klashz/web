import React from "react";
import { getPagesArray } from "../../utils/pages";

interface PaginationProps {
  totalPages: number;
  page: number;
  changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);
  
  return (
    <div className="page__wrapper" data-testid="wrapper">
      {pagesArray.map((p: number) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
