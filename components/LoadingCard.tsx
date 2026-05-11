"use client";

export function LoadingCard() {
  return (
    <div className="anim-fade-up" style={{
      borderRadius: 16,
      border: "1px solid rgba(0,229,255,0.14)",
      background: "rgba(7,14,26,0.95)",
      padding: "48px 32px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      position: "relative", overflow: "hidden",
    }}>
      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
        boxShadow: "0 0 12px rgba(0,229,255,0.6)",
        animation: "scan-line 2s ease-in-out infinite",
      }} />

      {/* Spinner */}
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid rgba(0,229,255,0.08)",
        }} />
        <div className="anim-spin-slow" style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#00e5ff",
          boxShadow: "0 0 12px rgba(0,229,255,0.4)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, color: "rgba(0,229,255,0.4)",
        }}>◉</div>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 13, letterSpacing: "0.2em",
          color: "#00e5ff",
          textShadow: "0 0 10px rgba(0,229,255,0.4)",
          marginBottom: 8,
        }}>
          SCANNING GLOBAL DATABASE
        </p>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: "0.1em",
          color: "rgba(90,122,154,0.5)",
        }}>
          CARRIER · REGION · TYPE · VALIDITY
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: "100%", height: 1,
        background: "rgba(0,229,255,0.08)",
        borderRadius: 1, overflow: "hidden", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 0, height: "100%", width: "40%",
          background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
          animation: "sweep-btn 1.8s linear infinite",
        }} />
      </div>
    </div>
  );
}
