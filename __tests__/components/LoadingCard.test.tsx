import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingCard } from "@/components/LoadingCard";

describe("LoadingCard", () => {
  it("renders the scanning headline", () => {
    render(<LoadingCard />);
    expect(screen.getByText(/scanning global database/i)).toBeInTheDocument();
  });

  it("renders the data categories being scanned", () => {
    render(<LoadingCard />);
    expect(screen.getByText(/carrier/i)).toBeInTheDocument();
    expect(screen.getByText(/region/i)).toBeInTheDocument();
    expect(screen.getByText(/type/i)).toBeInTheDocument();
    expect(screen.getByText(/validity/i)).toBeInTheDocument();
  });

  it("renders the spinner symbol", () => {
    render(<LoadingCard />);
    expect(screen.getByText("◉")).toBeInTheDocument();
  });
});
