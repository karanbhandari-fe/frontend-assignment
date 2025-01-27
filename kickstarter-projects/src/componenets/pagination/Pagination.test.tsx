import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("renders the pagination correctly", () => {
    render(
      <Pagination
        totalRecords={15}
        recordsPerPage={5}
        currentPage={1}
        onPageChange={() => {}}
      />
    );

    // Check Previous and Next buttons
    expect(screen.getByRole("button", { name: /Previous Page/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next Page/i })).toBeInTheDocument();

    // Check current page text
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });

  it("disables the Previous button on the first page", () => {
    render(
      <Pagination
        totalRecords={15}
        recordsPerPage={5}
        currentPage={1}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Previous Page/i })).toBeDisabled();
  });

  it("disables the Next button on the last page", () => {
    render(
      <Pagination
        totalRecords={15}
        recordsPerPage={5}
        currentPage={3}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Next Page/i })).toBeDisabled();
  });

  it("triggers onPageChange when buttons are clicked", () => {
    const mockOnPageChange = jest.fn();
    render(
      <Pagination
        totalRecords={15}
        recordsPerPage={5}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />
    );

    // Click Previous
    fireEvent.click(screen.getByRole("button", { name: /Previous Page/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    // Click Next
    fireEvent.click(screen.getByRole("button", { name: /Next Page/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
