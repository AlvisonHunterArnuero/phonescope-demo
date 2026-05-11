"use client";

interface ErrorCardProps {
  message: string;
}

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="anim-fade-up" style={{
      borderRadius: 16,
      border: "1px solid rgba(255,82,82,0.25)",
      background: "rgba(255,82,82,0.04)",
      boxShadow: "0 0 30px rgba(255,82,82,0.08)",
      padding: "40px 32px",
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 16, textAlign: "center",
    }}>
      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        border: "1px solid rgba(255,82,82,0.3)",
        background: "rgba(255,82,82,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
      }}>⚠</div>

      {/* Text */}
      <div>
        <p style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 13, letterSpacing: "0.15em",
          color: "#ff5252",
          textShadow: "0 0 10px rgba(255,82,82,0.4)",
          marginBottom: 8,
        }}>
          LOOKUP FAILED
        </p>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 12, letterSpacing: "0.06em",
          color: "rgba(255,82,82,0.6)",
          marginBottom: 8,
        }}>
          {message}
        </p>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: "0.08em",
          color: "rgba(90,122,154,0.45)",
        }}>
          INCLUDE COUNTRY CODE · E.G. +1 415 555 0100
        </p>
      </div>
    </div>
  );
}
