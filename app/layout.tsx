import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhoneScope — Global Phone Intelligence",
  description: "Verify any phone number, anywhere on earth. Real-time carrier lookup, type detection, and location intelligence.",
  authors: [{ name: "Alvison Hunter Arnuero", url: "https://alvisonhunter.com" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
