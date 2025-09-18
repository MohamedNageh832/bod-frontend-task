import { useCallback, useMemo, useState, type FC } from "react";
import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui";
import { cn, getPagination } from "@/shared/utils";

type PaginationProps = {
  className?: string;
  value?: number;
  totalPages: number;
  onChange: (value: number) => void;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { className, value, onChange, totalPages } = props || {};
  const [currentPage, setCurrentpage] = useState(value || 1);
  const data = useMemo(
    () => getPagination({ currentPage, totalPages }),
    [currentPage, totalPages]
  );

  const handleChange = useCallback(
    (value: number) => () => {
      if (value > totalPages) return;
      setCurrentpage(value);
      onChange(value);
    },
    [onChange, setCurrentpage, totalPages]
  );

  const renderPaginationItems = useCallback(
    (item: string, i: number) => {
      if (isNaN(parseInt(item)))
        return (
          <PaginationEllipsis
            className="px-2 py-1"
            key={`pagination-item-${i}`}
          />
        );

      return (
        <PaginationItem
          className={cn(
            "px-2 py-1 hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/50 rounded-lg cursor-pointer",
            currentPage === parseInt(item) && "text-accent-foreground bg-accent"
          )}
          onClick={handleChange(parseInt(item))}
          key={`pagination-item-${i}`}
        >
          {item}
        </PaginationItem>
      );
    },
    [currentPage, handleChange]
  );

  return (
    <BasePagination className={cn("w-auto", className)}>
      <PaginationContent>
        {data.length > 1 && (
          <PaginationPrevious
            className={cn(
              "cursor-pointer",
              currentPage === 1 &&
                "text-muted-foreground hover:text-muted-foreground hover:bg-background"
            )}
            onClick={handleChange(currentPage - 1)}
          />
        )}
        {data.map(renderPaginationItems)}
        {data.length > 1 && (
          <PaginationNext
            className={cn(
              "cursor-pointer",
              currentPage === totalPages &&
                "text-muted-foreground hover:text-muted-foreground hover:bg-background"
            )}
            onClick={handleChange(currentPage + 1)}
          />
        )}
      </PaginationContent>
    </BasePagination>
  );
};

export default Pagination;
