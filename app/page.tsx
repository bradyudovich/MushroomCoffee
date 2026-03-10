"use client";

import Image from "next/image";
import { useState } from "react";
import Comparison from "@/components/Comparison";

const benefits = [
  {
    icon: "🌿",
    title: "24-Hour Deep Hydration",
    description:
      "Grass-fed tallow's lipid profile mirrors your skin's own sebum, absorbing deeply without a greasy finish. One application keeps your skin supple and nourished from morning to night.",
  },
  {
    icon: "💛",
    title: "Vitamins A, D, E & K",
    description:
      "Naturally loaded with the fat-soluble vitamins your skin craves — for cellular renewal, barrier protection, and the kind of quiet, lasting glow that comes from truly fed skin.",
  },
  {
    icon: "🌸",
    title: "Botanically Pure",
    description:
      "Lemongrass and lavender essential oils bring calming aromatics and gentle skin-soothing benefits. No parabens, no water, no fillers — just three clean, purposeful ingredients.",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error ?? "Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error ? err.message : "Checkout failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-stone-800">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center overflow-hidden">
        {/* Soft sage radial glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(138,154,91,0.10)_0%,_transparent_70%)]" />

        <span className="mb-4 inline-block rounded-full border border-[#8A9A5B] bg-[#8A9A5B]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#8A9A5B]">
          Small-Batch · Grass-Fed · Limited Stock
        </span>

        <h1 className="mb-6 max-w-3xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl text-stone-900">
          Your Skin&apos;s{" "}
          <span className="text-[#8A9A5B]">Missing Match.</span>
        </h1>

        <p className="mb-10 max-w-xl text-lg text-stone-600 md:text-xl">
          Grass-fed tallow is molecularly similar to your skin&apos;s natural
          oils — delivering deep, 24-hour hydration that synthetic lotions
          simply can&apos;t replicate. Meet{" "}
          <em>PureGlow Tallow Cream, Lemongrass &amp; Lavender.</em>
        </p>

        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="mb-4 rounded-full bg-[#8A9A5B] px-10 py-4 text-lg font-semibold text-[#FDFCF0] shadow-lg shadow-[#8A9A5B]/30 transition-all hover:bg-[#7a8a4e] hover:shadow-[#8A9A5B]/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Redirecting…" : "Buy Now — $28.00"}
        </button>

        {error && <p className="mb-6 text-sm text-red-500">{error}</p>}

        <div className="mt-10 relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 shadow-2xl shadow-[#8A9A5B]/10">
          <Image
            src="/pureglow-tallow-cream.png"
            alt="PureGlow Tallow Cream — Lemongrass & Lavender"
            width={600}
            height={600}
            className="w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Why PureGlow?
          </h2>
          <p className="mb-14 text-center text-stone-500 max-w-xl mx-auto">
            Three reasons your skin will never go back to conventional lotion.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-stone-200 bg-[#FDFCF0] p-8 transition-all hover:border-[#8A9A5B]/50 hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{benefit.icon}</div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-6 py-24 bg-[#FDFCF0]">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Tallow vs. Water-Based Lotions
          </h2>
          <p className="mb-14 text-center text-stone-500 max-w-xl mx-auto">
            Not all moisturizers are created equal. See what your skin is
            actually getting.
          </p>
          <Comparison />

          <div className="mt-12 text-center">
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="rounded-full bg-[#8A9A5B] px-10 py-4 text-lg font-semibold text-[#FDFCF0] shadow-lg shadow-[#8A9A5B]/30 transition-all hover:bg-[#7a8a4e] hover:shadow-[#8A9A5B]/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting…" : "Get PureGlow — $28.00"}
            </button>
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} PureGlow. All rights reserved.
      </footer>
    </main>
  );
}

