import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

declare const global: {
  fetch: jest.Mock;
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          "s.no": 0,
          title: "Project 1",
          "percentage.funded": 80,
          "amt.pledged": 1000,
        },
        {
          "s.no": 1,
          title: "Project 2",
          "percentage.funded": 90,
          "amt.pledged": 5000,
        },
      ]),
  })
);

describe("App Component", () => {
  beforeEach(() => {
    // Clear the fetch mock before each test
    global.fetch.mockClear();
  });

  it("fetches and displays data", async () => {
    render(<App />);

    // Wait for the data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check for table content
    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(await screen.findByText("Project 1")).toBeInTheDocument();
    expect(await screen.findByText("80")).toBeInTheDocument();
    expect(await screen.findByText("1000")).toBeInTheDocument();
    expect(await screen.findByText("2")).toBeInTheDocument();
    expect(await screen.findByText("Project 2")).toBeInTheDocument();
    expect(await screen.findByText("90")).toBeInTheDocument();
    expect(await screen.findByText("5000")).toBeInTheDocument();
  });

  it("displays the correct pagination on load", async () => {
    render(<App />);

    // Wait for data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check pagination
    expect(await screen.findByText("Page 1 of 1")).toBeInTheDocument();
  });
});
