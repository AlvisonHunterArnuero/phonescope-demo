import { QUICK_EXAMPLES } from "@/lib/types";

describe("QUICK_EXAMPLES", () => {
  it("contains 8 entries", () => {
    expect(QUICK_EXAMPLES).toHaveLength(8);
  });

  it("every entry has the required shape", () => {
    QUICK_EXAMPLES.forEach((ex) => {
      expect(ex).toHaveProperty("label");
      expect(ex).toHaveProperty("flag");
      expect(ex).toHaveProperty("number");
      expect(ex).toHaveProperty("country");
    });
  });

  it("every number starts with a + sign (E.164 format)", () => {
    QUICK_EXAMPLES.forEach((ex) => {
      expect(ex.number).toMatch(/^\+/);
    });
  });

  it("every country code is exactly 2 uppercase letters", () => {
    QUICK_EXAMPLES.forEach((ex) => {
      expect(ex.country).toMatch(/^[A-Z]{2}$/);
    });
  });

  it("contains a USA entry with the correct number", () => {
    const usa = QUICK_EXAMPLES.find((ex) => ex.country === "US");
    expect(usa).toBeDefined();
    expect(usa?.number).toBe("+14155552671");
    expect(usa?.flag).toBe("🇺🇸");
  });

  it("contains a Nicaragua entry", () => {
    const ni = QUICK_EXAMPLES.find((ex) => ex.country === "NI");
    expect(ni).toBeDefined();
    expect(ni?.label).toBe("Nicaragua");
  });

  it("has no duplicate phone numbers", () => {
    const numbers = QUICK_EXAMPLES.map((ex) => ex.number);
    const unique = new Set(numbers);
    expect(unique.size).toBe(numbers.length);
  });

  it("has no duplicate country codes", () => {
    const codes = QUICK_EXAMPLES.map((ex) => ex.country);
    const unique = new Set(codes);
    expect(unique.size).toBe(codes.length);
  });
});
