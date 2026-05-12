import { cn, flagUrl, getPhoneTypeConfig, formatTimestamp } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// cn()
// ─────────────────────────────────────────────────────────────
describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates conflicting Tailwind classes (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("returns empty string when no arguments", () => {
    expect(cn()).toBe("");
  });
});

// ─────────────────────────────────────────────────────────────
// flagUrl()
// ─────────────────────────────────────────────────────────────
describe("flagUrl()", () => {
  it("returns a flagcdn URL with lowercase country code", () => {
    expect(flagUrl("US")).toBe("https://flagcdn.com/w80/us.png");
  });

  it("lowercases the country code", () => {
    expect(flagUrl("NI")).toBe("https://flagcdn.com/w80/ni.png");
  });

  it("handles already-lowercase input", () => {
    expect(flagUrl("gb")).toBe("https://flagcdn.com/w80/gb.png");
  });

  it("handles mixed-case input", () => {
    expect(flagUrl("De")).toBe("https://flagcdn.com/w80/de.png");
  });
});

// ─────────────────────────────────────────────────────────────
// getPhoneTypeConfig()
// ─────────────────────────────────────────────────────────────
describe("getPhoneTypeConfig()", () => {
  describe("mobile types", () => {
    it('returns MOBILE config for "mobile"', () => {
      const config = getPhoneTypeConfig("mobile");
      expect(config.label).toBe("MOBILE");
      expect(config.icon).toBe("📱");
      expect(config.color).toBe("#00e5ff");
    });

    it('returns MOBILE config for "cell"', () => {
      const config = getPhoneTypeConfig("cell");
      expect(config.label).toBe("MOBILE");
    });

    it("is case-insensitive for mobile", () => {
      expect(getPhoneTypeConfig("MOBILE").label).toBe("MOBILE");
    });
  });

  describe("landline types", () => {
    it('returns LANDLINE config for "fixed_line"', () => {
      const config = getPhoneTypeConfig("fixed_line");
      expect(config.label).toBe("LANDLINE");
      expect(config.icon).toBe("☎️");
      expect(config.color).toBe("#ffd740");
    });

    it('returns LANDLINE config for "landline"', () => {
      expect(getPhoneTypeConfig("landline").label).toBe("LANDLINE");
    });
  });

  describe("VoIP types", () => {
    it('returns VoIP config for "voip"', () => {
      const config = getPhoneTypeConfig("voip");
      expect(config.label).toBe("VoIP");
      expect(config.icon).toBe("🌐");
      expect(config.color).toBe("#1de9b6");
    });
  });

  describe("unknown types", () => {
    it('returns UNKNOWN config for "unknown"', () => {
      const config = getPhoneTypeConfig("unknown");
      expect(config.label).toBe("UNKNOWN");
      expect(config.icon).toBe("❓");
    });

    it("returns UNKNOWN config for empty string", () => {
      expect(getPhoneTypeConfig("").label).toBe("UNKNOWN");
    });

    it("returns UNKNOWN config for unrecognised type", () => {
      expect(getPhoneTypeConfig("satellite").label).toBe("UNKNOWN");
    });

    it("handles null/undefined gracefully via nullish coalescing", () => {
      // The function uses `type?.toLowerCase() ?? ""` so null-ish input falls to UNKNOWN
      expect(getPhoneTypeConfig(null as unknown as string).label).toBe("UNKNOWN");
    });
  });

  describe("config shape", () => {
    it("always returns all required fields", () => {
      const types = ["mobile", "fixed_line", "voip", "unknown"];
      types.forEach((t) => {
        const config = getPhoneTypeConfig(t);
        expect(config).toHaveProperty("label");
        expect(config).toHaveProperty("color");
        expect(config).toHaveProperty("bgColor");
        expect(config).toHaveProperty("borderColor");
        expect(config).toHaveProperty("icon");
      });
    });
  });
});

// ─────────────────────────────────────────────────────────────
// formatTimestamp()
// ─────────────────────────────────────────────────────────────
describe("formatTimestamp()", () => {
  it("returns a string ending with ' UTC'", () => {
    expect(formatTimestamp()).toMatch(/ UTC$/);
  });

  it("matches the format YYYY-MM-DD HH:MM:SS UTC", () => {
    const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} UTC$/;
    expect(formatTimestamp()).toMatch(pattern);
  });

  it("returns a timestamp close to the current time", () => {
    const before = Date.now();
    const ts = formatTimestamp();
    const after = Date.now();

    // Parse the timestamp back to a Date
    const parsed = new Date(ts.replace(" UTC", "Z")).getTime();
    expect(parsed).toBeGreaterThanOrEqual(before - 1000);
    expect(parsed).toBeLessThanOrEqual(after + 1000);
  });
});
