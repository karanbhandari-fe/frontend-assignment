import { render, screen } from "@testing-library/react";
import Table from "./Table";

const mockData = [
  { "s.no": 0,title: "Project 1", "percentage.funded": 80, "amt.pledged": 1000 },
  { "s.no": 1,title: "Project 2", "percentage.funded": 90, "amt.pledged": 5000 },
]

describe("Table Component", () => {
  it("renders the table correctly", () => {
    render(<Table data={mockData} />);

    // Check if table and caption are present
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByText("List of highly-rated Kickstarter projects")
    ).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();

    // Check table rows
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length + 1); // 1 header row + mockData rows
  });

  it("renders the correct data", () => {
    render(<Table data={mockData} />);
    
    // Check table content
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
  });
});
