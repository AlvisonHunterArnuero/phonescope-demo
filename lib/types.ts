export interface VeriphoneResponse {
  status: string;
  phone: string;
  phone_valid: boolean;
  phone_type: "mobile" | "fixed_line" | "voip" | "unknown" | string;
  phone_region: string;
  country: string;
  country_code: string; // ISO 2-letter, e.g. "NI"
  country_prefix: string; // e.g. "505"
  international_number: string;
  local_number: string;
  e164: string;
  carrier: string;
}

export interface QuickExample {
  label: string;
  flag: string;
  number: string;
  country: string;
}

export const QUICK_EXAMPLES: QuickExample[] = [
  { label: "Nicaragua", flag: "🇳🇮", number: "+50583761759", country: "NI" },
  { label: "USA", flag: "🇺🇸", number: "+14155552671", country: "US" },
  { label: "UK", flag: "🇬🇧", number: "+447911123456", country: "GB" },
  { label: "Spain", flag: "🇪🇸", number: "+34600123456", country: "ES" },
  { label: "Brazil", flag: "🇧🇷", number: "+5511987654321", country: "BR" },
  { label: "Japan", flag: "🇯🇵", number: "+81312345678", country: "JP" },
  { label: "Germany", flag: "🇩🇪", number: "+4915123456789", country: "DE" },
  { label: "UAE", flag: "🇦🇪", number: "+971501234567", country: "AE" },
];
