"use client";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 120px,
              rgba(0, 229, 255, 0.015) 120px,
              rgba(0, 229, 255, 0.015) 121px
            )
          `,
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: -200,
          background:
            "radial-gradient(circle, rgba(0, 229, 255, 0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: -150,
          right: -150,
          background:
            "radial-gradient(circle, rgba(124, 77, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          right: "20%",
          background:
            "radial-gradient(circle, rgba(255, 215, 64, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Corner decorations */}
      <svg
        className="absolute top-0 left-0 w-48 h-48 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M0 40 L40 0 L200 0"
          stroke="#00e5ff"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0 80 L80 0"
          stroke="#00e5ff"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 8"
        />
        <circle cx="40" cy="0" r="3" fill="#00e5ff" />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-48 h-48 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M200 160 L160 200 L0 200"
          stroke="#7c4dff"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M200 120 L120 200"
          stroke="#7c4dff"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 8"
        />
        <circle cx="160" cy="200" r="3" fill="#7c4dff" />
      </svg>

      {/* Data stream particles (CSS only) */}
      <div className="absolute top-0 left-1/4 w-px h-full overflow-hidden opacity-20">
        <div
          style={{
            width: "100%",
            background:
              "linear-gradient(180deg, transparent, #00e5ff, transparent)",
            height: "30%",
            animation: "data-stream 4s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
      </div>
      <div className="absolute top-0 right-1/3 w-px h-full overflow-hidden opacity-10">
        <div
          style={{
            width: "100%",
            background:
              "linear-gradient(180deg, transparent, #7c4dff, transparent)",
            height: "20%",
            animation: "data-stream 6s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
      </div>
    </div>
  );
}
