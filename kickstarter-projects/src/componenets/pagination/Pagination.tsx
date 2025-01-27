import React from "react";

interface PaginationProps {
    totalRecords: number; // Total number of records
    recordsPerPage: number; // Records displayed per page
    currentPage: number; // Current page number
    onPageChange: (page: number) => void; // Callback for page change
  }

  const Pagination: React.FC<PaginationProps> = ({
    totalRecords,
    recordsPerPage,
    currentPage,
    onPageChange,
  }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav
      className="pagination"
      aria-label="Pagination Navigation"
      role="navigation"
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        Previous
      </button>
      <span tabIndex={0} aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
