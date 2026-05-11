"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { QUICK_EXAMPLES } from "@/lib/types";

interface PhoneInputProps {
  onVerify: (phone: string) => void;
  isLoading: boolean;
}

export function PhoneInput({ onVerify, isLoading }: PhoneInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const v = value.trim();
    if (!v) { inputRef.current?.focus(); return; }
    onVerify(v);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  const tryExample = (num: string) => {
    setValue(num);
    setTimeout(() => onVerify(num), 40);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── Search bar ── */}
      <div
        className="search-bar"
        onFocusCapture={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,229,255,0.4)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(0,229,255,0.08)";
        }}
        onBlurCapture={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,229,255,0.2)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Phone icon */}
        <div style={{
          padding: "0 12px 0 18px",
          display: "flex", alignItems: "center",
          color: "rgba(0,229,255,0.35)", flexShrink: 0,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 5.72 5.72l.96-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.27 14l-.35 2.92z" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="tel"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="+1 415 555 0100"
          autoComplete="off"
          spellCheck={false}
          className="search-input"
        />

        {/* Verify button */}
        <button
          onClick={submit}
          disabled={isLoading}
          className="verify-btn"
          style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.55)";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(0,229,255,0.12)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(220,235,255,0.4)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {isLoading ? "SCANNING…" : "VERIFY"}
        </button>
      </div>

      {/* ── Quick example chips ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {QUICK_EXAMPLES.map((ex) => (
          <button
            key={ex.number}
            onClick={() => tryExample(ex.number)}
            style={{
              padding: "5px 13px",
              borderRadius: 999,
              border: "1px solid rgba(0,229,255,0.12)",
              background: "rgba(0,229,255,0.02)",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11,
              color: "rgba(140,185,220,0.65)",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.38)";
              e.currentTarget.style.color = "#00e5ff";
              e.currentTarget.style.background = "rgba(0,229,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.12)";
              e.currentTarget.style.color = "rgba(140,185,220,0.65)";
              e.currentTarget.style.background = "rgba(0,229,255,0.02)";
            }}
          >
            {ex.flag} {ex.label}
          </button>
        ))}
      </div>

    </div>
  );
}
