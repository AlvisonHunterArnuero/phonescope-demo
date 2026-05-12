# PhoneScope — Global Phone Intelligence

A sleek, cyberpunk-themed phone number lookup tool built with Next.js 15. Enter any phone number in E.164 format and get instant carrier, line type, region, and validity data powered by the Veriphone API.

![PhoneScope Preview](https://flagcdn.com/w80/us.png)

---

## Features

- **Real-time lookup** — verify any phone number worldwide in milliseconds
- **Carrier detection** — identifies the network operator for the number
- **Line type analysis** — distinguishes mobile, landline, and VoIP numbers
- **Geo-location data** — returns country, region, dial prefix, and ISO country code
- **E.164 validation** — checks number format compliance
- **195+ countries** supported
- **Quick examples** — one-click sample numbers for Nicaragua, USA, UK, Spain, Brazil, Japan, Germany, and UAE
- **Edge runtime** — API route runs on the edge for low-latency responses globally
- **Response caching** — lookup results are cached for 5 minutes to reduce API usage
- **Fully responsive** — works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + inline styles |
| Fonts | Orbitron, Share Tech Mono, Exo 2 (Google Fonts) |
| Phone API | [Veriphone API v2](https://veriphone.io/) |
| Flag images | [FlagCDN](https://flagcdn.com/) |
| Runtime | Edge (Next.js Edge Runtime) |

---

## Project Structure

```
phonescope/
├── app/
│   ├── api/
│   │   └── verify/
│   │       └── route.ts        # Edge API route — proxies Veriphone API
│   ├── globals.css             # Global styles, design tokens, animations
│   ├── layout.tsx              # Root layout, font imports
│   └── page.tsx                # Main page — header, search, results
├── components/
│   ├── BackgroundEffects.tsx   # Animated grid, glow orbs, corner decorations
│   ├── ErrorCard.tsx           # Error state UI
│   ├── LoadingCard.tsx         # Loading/scanning state UI
│   ├── PhoneInput.tsx          # Search bar + quick example chips
│   └── ResultCard.tsx          # Lookup result display card
├── lib/
│   ├── types.ts                # TypeScript interfaces + quick example data
│   └── utils.ts                # Helpers: flagUrl, getPhoneTypeConfig, formatTimestamp
├── .env.local                  # Environment variables (not committed)
└── next.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Veriphone API key](https://veriphone.io/) (free tier includes 1,000 requests/month)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd phonescope

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VERIPHONE_API_KEY=your_api_key_here
```

> Get your free API key at [veriphone.io](https://veriphone.io/).

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## API Reference

The app exposes a single internal API endpoint:

### `GET /api/verify`

Proxies a request to the Veriphone API and returns phone number intelligence data.

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `phone` | string | Yes | Phone number to verify (E.164 format recommended, e.g. `+14155552671`) |

**Example Request**

```
GET /api/verify?phone=%2B14155552671
```

**Example Response**

```json
{
  "status": "success",
  "phone": "+14155552671",
  "phone_valid": true,
  "phone_type": "mobile",
  "phone_region": "California",
  "country": "United States",
  "country_code": "US",
  "country_prefix": "1",
  "international_number": "+1 415-555-2671",
  "local_number": "415-555-2671",
  "e164": "+14155552671",
  "carrier": ""
}
```

**Error Responses**

| Status | Reason |
|---|---|
| `400` | `phone` query parameter is missing |
| `500` | `VERIPHONE_API_KEY` environment variable not set, or upstream API error |

---

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/) with zero configuration.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Make sure to add `VERIPHONE_API_KEY` to your Vercel project's environment variables under **Settings → Environment Variables**.

---

## TEST REFERENCE
This project uses Jest and React Testing Library to verify component behavior, API routes, and utility functions.

#### Test Structure
All tests live inside the __tests__ directory, mirrored by domain:

```text
__tests__/
├── __mocks__/
│   ├── fileMock.ts      # stubs image/font imports
│   └── styleMock.ts     # stubs CSS imports
├── api/
│   └── verify.test.ts   # 10 tests — 400/500/200 cases, mocks next/server + fetch
├── components/
│   ├── ErrorCard.test.tsx    # 5 tests
│   ├── LoadingCard.test.tsx  # 3 tests
│   ├── PhoneInput.test.tsx   # 14 tests — rendering, loading state, submit, chips
│   └── ResultCard.test.tsx   # 25 tests — valid/invalid, optional fields, type variants
└── lib/
    ├── types.test.ts    # 8 tests — QUICK_EXAMPLES shape and integrity
    └── utils.test.ts    # 16 tests — cn(), flagUrl(), getPhoneTypeConfig(), formatTimestamp()
```

Running Tests
You can use the following commands to execute the test suite:

Run all tests: (Or use npx jest directly)
```bash
npm test
```

Run tests without coverage data:
```bash
npx jest --no-coverage
```

Troubleshooting Configuration Note
The project uses jest.config.js instead of a TypeScript-based configuration file to remove the strict local requirement for ts-node.

If you encounter issues where specific matchers like toBeInTheDocument or toBeDisabled are not recognized, verify that your jest.config.js uses the correct setup array key:

```javascript
// jest.config.js
module.exports = {
  // ... other config
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
```

## License
MIT

### Proudly created by Alvison Hunter Arnuero
Last updated: Tuesday, May 12th, 2026
