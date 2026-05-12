import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResultCard } from "@/components/ResultCard";
import { VeriphoneResponse } from "@/lib/types";

// ─── Fixtures ────────────────────────────────────────────────
const validPhone: VeriphoneResponse = {
  status: "success",
  phone: "+14155552671",
  phone_valid: true,
  phone_type: "mobile",
  phone_region: "California",
  country: "United States",
  country_code: "US",
  country_prefix: "1",
  international_number: "+1 415-555-2671",
  local_number: "415-555-2671",
  e164: "+14155552671",
  carrier: "AT&T",
};

const invalidPhone: VeriphoneResponse = {
  ...validPhone,
  phone_valid: false,
  phone: "+000000",
  e164: "+000000",
  carrier: "",
};

const noCarrierPhone: VeriphoneResponse = {
  ...validPhone,
  carrier: "",
};

// ─────────────────────────────────────────────────────────────
// Rendering — valid number
// ─────────────────────────────────────────────────────────────
describe("ResultCard — valid number", () => {
  beforeEach(() => render(<ResultCard data={validPhone} />));

  it("renders the phone number in E.164 format", () => {
    expect(screen.getByText("+14155552671")).toBeInTheDocument();
  });

  it("renders the VALID badge", () => {
    expect(screen.getByText("VALID")).toBeInTheDocument();
  });

  it("renders the country name", () => {
    expect(screen.getByText("United States")).toBeInTheDocument();
  });

  it("renders the country code", () => {
    expect(screen.getByText("US")).toBeInTheDocument();
  });

  it("renders the dial prefix with + sign", () => {
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("renders the region", () => {
    expect(screen.getByText("California")).toBeInTheDocument();
  });

  it("renders the line type label", () => {
    expect(screen.getByText("MOBILE")).toBeInTheDocument();
  });

  it("renders the local number", () => {
    expect(screen.getByText("415-555-2671")).toBeInTheDocument();
  });

  it("renders the carrier name", () => {
    expect(screen.getByText("AT&T")).toBeInTheDocument();
  });

  it("renders the international number", () => {
    expect(screen.getByText("+1 415-555-2671")).toBeInTheDocument();
  });

  it("renders the PHONESCOPE header bar", () => {
    expect(screen.getByText(/phonescope · lookup result/i)).toBeInTheDocument();
  });

  it("renders the country flag image", () => {
    const img = screen.getByRole("img", { name: /united states/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://flagcdn.com/w80/us.png");
  });
});

// ─────────────────────────────────────────────────────────────
// Rendering — invalid number
// ─────────────────────────────────────────────────────────────
describe("ResultCard — invalid number", () => {
  it("renders the INVALID badge", () => {
    render(<ResultCard data={invalidPhone} />);
    expect(screen.getByText("INVALID")).toBeInTheDocument();
  });

  it("does not render VALID badge for invalid number", () => {
    render(<ResultCard data={invalidPhone} />);
    expect(screen.queryByText("VALID")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// Rendering — optional fields
// ─────────────────────────────────────────────────────────────
describe("ResultCard — optional fields", () => {
  it("does not render carrier section when carrier is empty", () => {
    render(<ResultCard data={noCarrierPhone} />);
    expect(screen.queryByText("CARRIER")).not.toBeInTheDocument();
  });

  it("renders fallback globe emoji when flag fails to load", () => {
    render(<ResultCard data={validPhone} />);
    const img = screen.getByRole("img", { name: /united states/i });
    // Simulate image load error
    fireEvent.error(img);
    expect(screen.getByText("🌐")).toBeInTheDocument();
  });

  it("renders — for missing local number", () => {
    render(<ResultCard data={{ ...validPhone, local_number: "" }} />);
    // The LOCAL label should still be present
    expect(screen.getByText("LOCAL")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// Data grid cells
// ─────────────────────────────────────────────────────────────
describe("ResultCard — data grid labels", () => {
  beforeEach(() => render(<ResultCard data={validPhone} />));

  it("renders COUNTRY label", () => {
    expect(screen.getByText("COUNTRY")).toBeInTheDocument();
  });

  it("renders COUNTRY CODE label", () => {
    expect(screen.getByText("COUNTRY CODE")).toBeInTheDocument();
  });

  it("renders DIAL PREFIX label", () => {
    expect(screen.getByText("DIAL PREFIX")).toBeInTheDocument();
  });

  it("renders REGION label", () => {
    expect(screen.getByText("REGION")).toBeInTheDocument();
  });

  it("renders LINE TYPE label", () => {
    expect(screen.getByText("LINE TYPE")).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
// Phone type variants
// ─────────────────────────────────────────────────────────────
describe("ResultCard — phone type display", () => {
  it("shows LANDLINE for fixed_line type", () => {
    render(<ResultCard data={{ ...validPhone, phone_type: "fixed_line" }} />);
    expect(screen.getByText("LANDLINE")).toBeInTheDocument();
  });

  it("shows VoIP for voip type", () => {
    render(<ResultCard data={{ ...validPhone, phone_type: "voip" }} />);
    expect(screen.getByText("VoIP")).toBeInTheDocument();
  });

  it("shows UNKNOWN for unrecognised type", () => {
    render(<ResultCard data={{ ...validPhone, phone_type: "satellite" }} />);
    expect(screen.getByText("UNKNOWN")).toBeInTheDocument();
  });
});
