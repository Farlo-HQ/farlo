import { useMemo } from "react";
import styles from "./styles.module.scss";
import { Section } from "../section";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useDeviceSize } from "@/hooks/useDeviceSize";

interface PaginationProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = (props) => {
  const { className, totalPages, currentPage, onPageChange } = props;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const paginationRange = useMemo(() => {
    const delta = 1; // Number of pages to show on either side of the current page
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Calculate the range
    if (totalPages <= 5) {
      // If total pages is 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Always include first page
      range.push(1);

      // Calculate middle range
      const startPage = Math.max(2, currentPage - delta);
      const endPage = Math.min(totalPages - 1, currentPage + delta);

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      // Always include last page
      range.push(totalPages);
    }
    // Add ellipsis where needed
    let prev: number | null = null;
    for (const i of range) {
      if (prev) {
        if (i - prev > 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  const handleNextPage = () => {
    if (!isLastPage) onPageChange(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (!isFirstPage) onPageChange(currentPage - 1);
  };

  const { isMobile } = useDeviceSize(600);

  return (
    <Section sectionClassName={styles.wrapper}>
      <div className={styles.content}>
        <button disabled={isFirstPage} onClick={handlePrevPage}>
          {isMobile ? <IconChevronLeft size={16} /> : "Prev"}
        </button>

        <div className={styles.pages}>
          {paginationRange.map((item, index) => (
            <div key={`page-${item}-${index}`}>
              {item === "..." ? (
                <span>...</span>
              ) : (
                <button
                  data-testid={`pagination-link-${item}`}
                  // isActive={}
                  onClick={() => onPageChange(item as number)}
                  className={`${
                    currentPage === item ? styles.currentPage : ""
                  }`}
                >
                  {item}
                </button>
              )}
            </div>
          ))}
        </div>

        <button disabled={isLastPage} onClick={handleNextPage}>
          {isMobile ? <IconChevronRight size={16} /> : "Next"}
        </button>
      </div>
    </Section>
  );
};

export default Pagination;
