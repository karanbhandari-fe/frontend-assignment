import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

declare const global: {
  fetch: jest.Mock;
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { "s.no": 0, "percentage.funded": 80, "amt.pledged": 1000 },
        { "s.no": 1, "percentage.funded": 90, "amt.pledged": 5000 },
      ]),
  })
);



describe("App Component", () => {
  it("fetches and displays data", async () => {
    render(<App />);

    // Wait for the data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check for table content
    const { getByRole } =  render(<App />);
  const table = getByRole('table');
  // first rowgroup is for the thead second is for tbody
  const tbody = within(table).getAllByRole('rowgroup')[1];
  const rows = within(tbody).getAllByRole('row');

const columns = within(rows[0]).getAllByRole('cell');
  expect(columns).toHaveLength(3);
  expect(columns[0]).toHaveTextContent("1");
  expect(columns[1]).toHaveTextContent("80");
  expect(columns[2]).toHaveTextContent("1000");
  });

  it("displays the correct pagination on load", async () => {
    render(<App />);

    // Wait for data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    // Check pagination
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });
});
