import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneInput } from "@/components/PhoneInput";
import { QUICK_EXAMPLES } from "@/lib/types";

const setup = (props?: Partial<React.ComponentProps<typeof PhoneInput>>) => {
  const onVerify = jest.fn();
  const utils = render(
    <PhoneInput onVerify={onVerify} isLoading={false} {...props} />
  );
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /verify/i });
  return { onVerify, input, button, ...utils };
};

// ─────────────────────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────────────────────
describe("PhoneInput — rendering", () => {
  it("renders the phone input field", () => {
    setup();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the VERIFY button", () => {
    setup();
    expect(screen.getByRole("button", { name: /verify/i })).toBeInTheDocument();
  });

  it("renders all quick-example chips", () => {
    setup();
    QUICK_EXAMPLES.forEach((ex) => {
      expect(screen.getByRole("button", { name: new RegExp(ex.label, "i") })).toBeInTheDocument();
    });
  });

  it("shows placeholder text", () => {
    setup();
    expect(screen.getByPlaceholderText("+1 415 555 0100")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────────────────────
describe("PhoneInput — loading state", () => {
  it("shows SCANNING… text when isLoading is true", () => {
    render(<PhoneInput onVerify={jest.fn()} isLoading={true} />);
    expect(screen.getByRole("button", { name: /scanning/i })).toBeInTheDocument();
  });

  it("disables the button when isLoading is true", () => {
    render(<PhoneInput onVerify={jest.fn()} isLoading={true} />);
    expect(screen.getByRole("button", { name: /scanning/i })).toBeDisabled();
  });

  it("enables the button when isLoading is false", () => {
    setup();
    expect(screen.getByRole("button", { name: /verify/i })).not.toBeDisabled();
  });
});

// ─────────────────────────────────────────────────────────────
// User interaction — typing and submitting
// ─────────────────────────────────────────────────────────────
describe("PhoneInput — submit behaviour", () => {
  it("calls onVerify with the typed value when VERIFY is clicked", async () => {
    const user = userEvent.setup();
    const { onVerify, input, button } = setup();

    await user.type(input, "+14155552671");
    await user.click(button);

    expect(onVerify).toHaveBeenCalledTimes(1);
    expect(onVerify).toHaveBeenCalledWith("+14155552671");
  });

  it("calls onVerify when Enter is pressed", async () => {
    const user = userEvent.setup();
    const { onVerify, input } = setup();

    await user.type(input, "+14155552671");
    await user.keyboard("{Enter}");

    expect(onVerify).toHaveBeenCalledWith("+14155552671");
  });

  it("trims whitespace before calling onVerify", async () => {
    const user = userEvent.setup();
    const { onVerify, input, button } = setup();

    await user.type(input, "  +14155552671  ");
    await user.click(button);

    expect(onVerify).toHaveBeenCalledWith("+14155552671");
  });

  it("does NOT call onVerify when input is empty", async () => {
    const user = userEvent.setup();
    const { onVerify, button } = setup();

    await user.click(button);

    expect(onVerify).not.toHaveBeenCalled();
  });

  it("does NOT call onVerify when input is only whitespace", async () => {
    const user = userEvent.setup();
    const { onVerify, input, button } = setup();

    await user.type(input, "   ");
    await user.click(button);

    expect(onVerify).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
// Quick example chips
// ─────────────────────────────────────────────────────────────
describe("PhoneInput — quick example chips", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("fills the input with the example number when a chip is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { onVerify, input } = setup();

    const usaChip = screen.getByRole("button", { name: /usa/i });
    await user.click(usaChip);

    expect(input).toHaveValue("+14155552671");
  });

  it("calls onVerify with the example number after the chip delay", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { onVerify } = setup();

    const usaChip = screen.getByRole("button", { name: /usa/i });
    await user.click(usaChip);

    // The component uses setTimeout(..., 40) before calling onVerify
    jest.advanceTimersByTime(50);

    await waitFor(() => {
      expect(onVerify).toHaveBeenCalledWith("+14155552671");
    });
  });
});
