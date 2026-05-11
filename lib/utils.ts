import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flagUrl(countryCode: string): string {
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
}

export function getPhoneTypeConfig(type: string): {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
} {
  const t = type?.toLowerCase() ?? "";
  if (t.includes("mobile") || t.includes("cell")) {
    return {
      label: "MOBILE",
      color: "#00e5ff",
      bgColor: "rgba(0, 229, 255, 0.08)",
      borderColor: "rgba(0, 229, 255, 0.3)",
      icon: "📱",
    };
  }
  if (t.includes("fixed") || t.includes("landline")) {
    return {
      label: "LANDLINE",
      color: "#ffd740",
      bgColor: "rgba(255, 215, 64, 0.08)",
      borderColor: "rgba(255, 215, 64, 0.3)",
      icon: "☎️",
    };
  }
  if (t.includes("voip")) {
    return {
      label: "VoIP",
      color: "#1de9b6",
      bgColor: "rgba(29, 233, 182, 0.08)",
      borderColor: "rgba(29, 233, 182, 0.3)",
      icon: "🌐",
    };
  }
  return {
    label: "UNKNOWN",
    color: "#7ba3c8",
    bgColor: "rgba(123, 163, 200, 0.08)",
    borderColor: "rgba(123, 163, 200, 0.3)",
    icon: "❓",
  };
}

export function formatTimestamp(): string {
  return new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
}
