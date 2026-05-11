"use client";

import { useState } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PhoneInput } from "@/components/PhoneInput";
import { ResultCard } from "@/components/ResultCard";
import { LoadingCard } from "@/components/LoadingCard";
import { ErrorCard } from "@/components/ErrorCard";
import { VeriphoneResponse } from "@/lib/types";

type AppState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: VeriphoneResponse }
  | { status: "error"; message: string };

export default function Home() {
  const [state, setState] = useState<AppState>({ status: "idle" });

  const handleVerify = async (phone: string) => {
    setState({ status: "loading" });
    try {
      const res = await fetch(`/api/verify?phone=${encodeURIComponent(phone)}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data: VeriphoneResponse = await res.json();
      if (data.status !== "success") throw new Error("API returned non-success status");
      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Check your number format or connection",
      });
    }
  };

  return (
    <div className="page-wrapper">
      <BackgroundEffects />

      <div className="content-col">

        {/* ── Header ── */}
        <div className="page-header">

          {/* Badge */}
          <div className="page-badge">
            <span style={{
              display: "inline-block", width: 7, height: 7, borderRadius: "50%",
              background: "#1de9b6", flexShrink: 0,
            }} className="anim-pulse-dot" />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11, letterSpacing: "0.2em",
              color: "rgba(0,229,255,0.7)",
            }}>
              PHONESCOPE — GLOBAL LOOKUP
            </span>
          </div>

          {/* Title — CSS class handles font-size at all breakpoints */}
          <div style={{ marginBottom: 14 }}>
            <span className="title-gradient">Phone Intelligence</span>
          </div>

          {/* Subtitle */}
          <p className="page-subtitle">
            // verify any number, anywhere on earth
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="search-section">
          <PhoneInput onVerify={handleVerify} isLoading={state.status === "loading"} />
        </div>

        {/* ── Result / idle area ── */}
        <div>
          {state.status === "loading" && <LoadingCard />}
          {state.status === "success" && <ResultCard data={state.data} />}
          {state.status === "error"   && <ErrorCard message={state.message} />}
          {state.status === "idle"    && <IdleHint />}
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: "0.2em",
            color: "rgba(90,122,154,0.45)",
          }}>
            POWERED BY VERIPHONE API · FLAG DATA: FLAGCDN.COM
          </p>
        </div>

      </div>
    </div>
  );
}

/* ── Idle hint ── */
function IdleHint() {
  const features = [
    "E.164 VALIDATION", "CARRIER DETECTION", "LINE TYPE",
    "GEO-LOCATION", "195+ COUNTRIES", "REAL-TIME LOOKUP",
  ];

  return (
    <div className="anim-fade-up" style={{
      borderRadius: 16,
      border: "1px solid rgba(0,229,255,0.08)",
      background: "rgba(7,16,31,0.6)",
      padding: "40px 32px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
    }}>

      {/* Globe icon */}
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          border: "1px solid rgba(0,229,255,0.12)",
          background: "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="rgba(0,229,255,0.35)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <div className="anim-spin-slow" style={{
          position: "absolute", inset: -10, borderRadius: "50%",
          border: "1px dashed rgba(0,229,255,0.1)",
        }} />
      </div>

      {/* Feature chips */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
        {features.map((f) => (
          <span key={f} style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10, letterSpacing: "0.1em",
            color: "rgba(90,122,154,0.7)",
            padding: "4px 10px", borderRadius: 4,
            border: "1px solid rgba(0,229,255,0.07)",
            background: "rgba(0,229,255,0.02)",
          }}>
            {f}
          </span>
        ))}
      </div>

      {/* Prompt */}
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 11, letterSpacing: "0.15em",
        color: "rgba(90,122,154,0.5)",
      }}>
        ENTER A NUMBER ABOVE TO BEGIN
        <span className="anim-blink" style={{ color: "rgba(0,229,255,0.5)", marginLeft: 4 }}>_</span>
      </p>
    </div>
  );
}
