import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorCard } from "@/components/ErrorCard";

describe("ErrorCard", () => {
  it("renders the LOOKUP FAILED heading", () => {
    render(<ErrorCard message="Something went wrong" />);
    expect(screen.getByText(/lookup failed/i)).toBeInTheDocument();
  });

  it("renders the error message passed as a prop", () => {
    render(<ErrorCard message="Invalid phone number format" />);
    expect(screen.getByText("Invalid phone number format")).toBeInTheDocument();
  });

  it("renders the hint about including a country code", () => {
    render(<ErrorCard message="error" />);
    expect(screen.getByText(/include country code/i)).toBeInTheDocument();
  });

  it("renders the warning icon", () => {
    render(<ErrorCard message="error" />);
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });

  it("renders different messages correctly", () => {
    const { rerender } = render(<ErrorCard message="First error" />);
    expect(screen.getByText("First error")).toBeInTheDocument();

    rerender(<ErrorCard message="Second error" />);
    expect(screen.getByText("Second error")).toBeInTheDocument();
    expect(screen.queryByText("First error")).not.toBeInTheDocument();
  });
});
