import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZenFocus Mushroom Coffee — Focus, Clarity & Calm Energy",
  description:
    "Premium adaptogenic mushroom coffee with Lion's Mane, Chaga & Cordyceps. Smooth energy, zero crash, sharper focus.",
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

