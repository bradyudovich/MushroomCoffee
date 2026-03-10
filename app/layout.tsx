import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PureGlow Tallow Cream — Lemongrass & Lavender | Modern Apothecary",
  description:
    "Small-batch grass-fed tallow cream with lemongrass & lavender. Biocompatible deep hydration, vitamins A D E K, zero synthetics. $28.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

