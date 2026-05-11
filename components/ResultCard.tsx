"use client";

import { useState } from "react";
import { VeriphoneResponse } from "@/lib/types";
import { flagUrl, getPhoneTypeConfig, formatTimestamp } from "@/lib/utils";

interface ResultCardProps {
  data: VeriphoneResponse;
}

export function ResultCard({ data }: ResultCardProps) {
  const [flagErr, setFlagErr] = useState(false);
  const valid     = data.phone_valid;
  const typeConf  = getPhoneTypeConfig(data.phone_type);
  const ts        = formatTimestamp();

  const accent     = valid ? "#00e676" : "#ff5252";
  const accentBg   = valid ? "rgba(0,230,118,0.07)"  : "rgba(255,82,82,0.07)";
  const accentBdr  = valid ? "rgba(0,230,118,0.28)"  : "rgba(255,82,82,0.28)";
  const accentGlow = valid ? "rgba(0,230,118,0.15)"  : "rgba(255,82,82,0.15)";

  return (
    <div className="anim-fade-up" style={{
      borderRadius: 16,
      border: `1px solid ${accentBdr}`,
      background: "rgba(7,14,26,0.98)",
      boxShadow: `0 0 40px ${accentGlow}, 0 16px 48px rgba(0,0,0,0.4)`,
      overflow: "hidden",
    }}>

      {/* ── Top bar ── */}
      <div className="result-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block", width: 7, height: 7, borderRadius: "50%",
            background: accent, boxShadow: `0 0 8px ${accent}`, flexShrink: 0,
          }} className={valid ? "anim-pulse-dot" : ""} />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10, letterSpacing: "0.12em",
            color: "rgba(160,200,230,0.45)",
          }}>
            PHONESCOPE · LOOKUP RESULT
          </span>
        </div>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 9, letterSpacing: "0.08em",
          color: "rgba(90,122,154,0.45)",
        }}>
          {ts}
        </span>
      </div>

      {/* ── Phone number hero ── */}
      <div className="result-hero">
        {/* Flag */}
        <div className="result-hero-flag" style={{
          width: 64, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0,
          border: "1px solid rgba(0,229,255,0.18)",
          boxShadow: "0 0 16px rgba(0,229,255,0.08)",
        }}>
          {!flagErr && data.country_code ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={flagUrl(data.country_code)}
              alt={data.country}
              onError={() => setFlagErr(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,229,255,0.04)", fontSize: 22,
            }}>🌐</div>
          )}
        </div>

        {/* Number + international */}
        <div className="result-hero-number">
          <div className="result-phone-number">
            {data.e164 || data.phone}
          </div>
          {data.international_number && (
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12, color: "rgba(140,185,220,0.5)",
              marginTop: 4, letterSpacing: "0.06em",
            }}>
              {data.international_number}
            </div>
          )}
        </div>

        {/* Valid badge */}
        <div className="result-hero-badge" style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "7px 14px", borderRadius: 999, flexShrink: 0,
          background: accentBg, border: `1px solid ${accentBdr}`,
          boxShadow: `0 0 12px ${accentGlow}`,
        }}>
          <span style={{
            display: "inline-block", width: 7, height: 7, borderRadius: "50%",
            background: accent, boxShadow: `0 0 8px ${accent}`,
          }} className={valid ? "anim-pulse-dot" : ""} />
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 11, fontWeight: 700,
            color: accent, letterSpacing: "0.12em",
          }}>
            {valid ? "VALID" : "INVALID"}
          </span>
        </div>
      </div>

      {/* ── Data grid ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid rgba(0,229,255,0.07)",
      }}>
        <Cell label="COUNTRY"      value={data.country      || "—"} />
        <Cell label="COUNTRY CODE" value={data.country_code || "—"} accent="#00e5ff" large />
        <Cell label="DIAL PREFIX"  value={data.country_prefix ? `+${data.country_prefix}` : "—"} accent="#ffd740" large />
        <Cell label="REGION"       value={data.phone_region  || "—"} accent="#1de9b6" />
      </div>

      {/* ── Line type ── */}
      <div className="result-linetype">
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: "0.15em",
          color: "rgba(90,122,154,0.6)",
          flexShrink: 0,
        }}>LINE TYPE</span>

        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "6px 14px", borderRadius: 999,
          background: typeConf.bgColor, border: `1px solid ${typeConf.borderColor}`,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14 }}>{typeConf.icon}</span>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 11, fontWeight: 700,
            color: typeConf.color, letterSpacing: "0.1em",
          }}>
            {typeConf.label}
          </span>
        </div>

        {/* Dot trail */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 5, opacity: 0.3 }}>
          {[1, 0.75, 0.5, 0.3, 0.15].map((o, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#00e5ff", opacity: o,
            }} />
          ))}
        </div>
      </div>

      {/* ── Footer row ── */}
      <div className="result-footer">
        {/* Local number */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            color: "rgba(90,122,154,0.6)", flexShrink: 0,
          }}>LOCAL</span>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 18, fontWeight: 600,
            color: "#1de9b6", letterSpacing: "0.08em",
            textShadow: "0 0 10px rgba(29,233,182,0.35)",
          }}>
            {data.local_number || "—"}
          </span>
        </div>

        {/* Carrier */}
        {data.carrier && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 15 }}>📡</span>
            <div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9, letterSpacing: "0.15em",
                color: "rgba(90,122,154,0.5)", marginBottom: 2,
              }}>CARRIER</div>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: 16, fontWeight: 600,
                color: "#ffd740",
                textShadow: "0 0 10px rgba(255,215,64,0.35)",
              }}>
                {data.carrier}
              </div>
            </div>
          </div>
        )}

        {/* API status */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block", width: 5, height: 5, borderRadius: "50%",
            background: "#00e676", boxShadow: "0 0 6px #00e676",
          }} />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: "0.1em",
            color: "rgba(90,122,154,0.45)",
          }}>
            VERIPHONE · {data.status?.toUpperCase()}
          </span>
        </div>
      </div>

    </div>
  );
}

/* ── Data cell ── */
function Cell({ label, value, accent, large }: {
  label: string; value: string; accent?: string; large?: boolean;
}) {
  return (
    <div className="result-cell">
      <span className="result-cell-label">{label}</span>
      <span
        className={`result-cell-value ${accent ? "accent" : "normal"}`}
        style={{
          color: accent || "#ddeeff",
          textShadow: accent ? `0 0 12px ${accent}55` : "none",
        }}
      >
        {value}
      </span>
    </div>
  );
}
