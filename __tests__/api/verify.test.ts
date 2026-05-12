/**
 * Tests for GET /api/verify (app/api/verify/route.ts)
 *
 * NextRequest/NextResponse depend on the Web Fetch API (Request/Response).
 * We mock the entire "next/server" module so the handler can be imported and
 * exercised in a plain Node environment without those globals.
 */

// 1. Inject the missing Web API globals for Node
if (typeof global.Request === "undefined") {
  // @ts-ignore
  global.Request = class Request {};
  // @ts-ignore
  global.Response = class Response {};
  // @ts-ignore
  global.Headers = class Headers {};
}

// ─── Mock next/server before any imports ─────────────────────
jest.mock("next/server", () => {
  const actual = jest.requireActual("next/server");

  /**
   * Minimal NextRequest stand-in.
   * Exposes only what the route handler actually uses:
   *   req.url  →  new URL(req.url).searchParams
   */
  class MockNextRequest {
    url: string;
    constructor(url: string) {
      this.url = url;
    }
  }

  /**
   * Minimal NextResponse stand-in.
   * Mirrors the static NextResponse.json() API used by the handler.
   */
  class MockNextResponse {
    private _body: unknown;
    status: number;

    constructor(body: unknown, init?: { status?: number }) {
      this._body = body;
      this.status = init?.status ?? 200;
    }

    async json() {
      return this._body;
    }

    static json(body: unknown, init?: { status?: number }) {
      return new MockNextResponse(body, init);
    }
  }

  return {
    ...actual,
    NextRequest: MockNextRequest,
    NextResponse: MockNextResponse,
  };
});

// ─── Now import the handler (next/server is already mocked) ──
import { GET } from "@/app/api/verify/route";
import { NextRequest } from "next/server";

// ─── Helpers ─────────────────────────────────────────────────
function makeRequest(phone?: string): NextRequest {
  const url = phone
    ? `http://localhost/api/verify?phone=${encodeURIComponent(phone)}`
    : "http://localhost/api/verify";
  return new NextRequest(url);
}

const mockSuccessPayload = {
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

// ─────────────────────────────────────────────────────────────
// Setup / teardown
// ─────────────────────────────────────────────────────────────
beforeEach(() => {
  process.env.VERIPHONE_API_KEY = "test-api-key-123";
  global.fetch = jest.fn() as unknown as typeof fetch;
});

afterEach(() => {
  jest.resetAllMocks();
  delete process.env.VERIPHONE_API_KEY;
});

// ─────────────────────────────────────────────────────────────
// 400 — missing phone parameter
// ─────────────────────────────────────────────────────────────
describe("GET /api/verify — missing phone", () => {
  it("returns 400 when phone query param is absent", async () => {
    const res = await GET(makeRequest());
    expect(res.status).toBe(400);
  });

  it("returns an error message in the body", async () => {
    const res = await GET(makeRequest());
    const body = await res.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toMatch(/required/i);
  });
});

// ─────────────────────────────────────────────────────────────
// 500 — missing API key
// ─────────────────────────────────────────────────────────────
describe("GET /api/verify — missing API key", () => {
  it("returns 500 when VERIPHONE_API_KEY is not set", async () => {
    delete process.env.VERIPHONE_API_KEY;
    const res = await GET(makeRequest("+14155552671"));
    expect(res.status).toBe(500);
  });

  it("returns a descriptive error message", async () => {
    delete process.env.VERIPHONE_API_KEY;
    const res = await GET(makeRequest("+14155552671"));
    const body = await res.json();
    expect(body.error).toMatch(/api key/i);
  });
});

// ─────────────────────────────────────────────────────────────
// 200 — successful lookup
// ─────────────────────────────────────────────────────────────
describe("GET /api/verify — successful lookup", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockSuccessPayload,
    });
  });

  it("returns 200 on a successful upstream response", async () => {
    const res = await GET(makeRequest("+14155552671"));
    expect(res.status).toBe(200);
  });

  it("returns the upstream payload in the response body", async () => {
    const res = await GET(makeRequest("+14155552671"));
    const body = await res.json();
    expect(body.status).toBe("success");
    expect(body.phone_valid).toBe(true);
    expect(body.country_code).toBe("US");
  });

  it("calls the Veriphone API with the correct URL", async () => {
    await GET(makeRequest("+14155552671"));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(calledUrl).toContain("api.veriphone.io/v2/verify");
    expect(calledUrl).toContain("phone=%2B14155552671");
    expect(calledUrl).toContain("key=test-api-key-123");
  });

  it("passes the Accept: application/json header", async () => {
    await GET(makeRequest("+14155552671"));
    const calledOptions = (global.fetch as jest.Mock).mock.calls[0][1];
    expect(calledOptions.headers).toEqual({ Accept: "application/json" });
  });
});

// ─────────────────────────────────────────────────────────────
// 500 — upstream API errors
// ─────────────────────────────────────────────────────────────
describe("GET /api/verify — upstream errors", () => {
  it("returns 500 when the upstream API responds with a non-OK status", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    });
    const res = await GET(makeRequest("+14155552671"));
    expect(res.status).toBe(500);
  });

  it("includes the upstream status code in the error message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    });
    const res = await GET(makeRequest("+14155552671"));
    const body = await res.json();
    expect(body.error).toContain("503");
  });

  it("returns 500 when fetch throws a network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network failure"));
    const res = await GET(makeRequest("+14155552671"));
    expect(res.status).toBe(500);
  });

  it("includes the network error message in the response", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network failure"));
    const res = await GET(makeRequest("+14155552671"));
    const body = await res.json();
    expect(body.error).toBe("Network failure");
  });
});
