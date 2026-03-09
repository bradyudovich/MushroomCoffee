"use client";

import Image from "next/image";
import { useState } from "react";
import Comparison from "@/components/Comparison";

const benefits = [
  {
    icon: "🧠",
    title: "Sharper Focus",
    description:
      "Lion's Mane mushroom has been shown to support nerve growth factor (NGF) production, helping you stay sharp, present, and in flow — without the mid-morning crash.",
  },
  {
    icon: "⚡",
    title: "Clean, Calm Energy",
    description:
      "Chaga and Cordyceps work synergistically with a lower caffeine dose to deliver smooth, sustained energy that lasts all day — zero jitters, zero crash.",
  },
  {
    icon: "🛡️",
    title: "Immune & Gut Support",
    description:
      "Beta-glucans from functional mushrooms nourish your gut microbiome and fortify your immune system, making every cup a step toward better overall health.",
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
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(52,211,153,0.08)_0%,_transparent_70%)]" />

        <span className="mb-4 inline-block rounded-full border border-emerald-700 bg-emerald-900/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          New Formula — Limited Stock
        </span>

        <h1 className="mb-6 max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Coffee That Works{" "}
          <span className="text-emerald-400">As Hard As You Do</span>
        </h1>

        <p className="mb-10 max-w-xl text-lg text-neutral-400 md:text-xl">
          ZenFocus Mushroom Coffee blends premium arabica with Lion&apos;s Mane,
          Chaga &amp; Cordyceps — so you can focus deeper, sustain your energy,
          and feel genuinely good all day long.
        </p>

        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="mb-4 rounded-full bg-emerald-500 px-10 py-4 text-lg font-bold text-neutral-950 shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Redirecting…" : "Buy Now — $34.00"}
        </button>

        {error && (
          <p className="mb-6 text-sm text-red-400">{error}</p>
        )}

        <div className="mt-10 relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl shadow-emerald-900/20">
          <Image
            src="/mushroom-coffee-hero.png"
            alt="ZenFocus Mushroom Coffee"
            width={600}
            height={600}
            className="w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-24 bg-neutral-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Why ZenFocus?
          </h2>
          <p className="mb-14 text-center text-neutral-400 max-w-xl mx-auto">
            Three science-backed reasons thousands have switched from ordinary
            coffee.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-neutral-700 bg-neutral-800/50 p-8 transition-all hover:border-emerald-700/60 hover:bg-neutral-800"
              >
                <div className="mb-4 text-4xl">{benefit.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-6 py-24 bg-neutral-950">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            ZenFocus vs. Regular Coffee
          </h2>
          <p className="mb-14 text-center text-neutral-400 max-w-xl mx-auto">
            Not all coffee is created equal. See how ZenFocus stacks up against
            your everyday brew.
          </p>
          <Comparison />

          <div className="mt-12 text-center">
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="rounded-full bg-emerald-500 px-10 py-4 text-lg font-bold text-neutral-950 shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting…" : "Get ZenFocus — $34.00"}
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-600">
        © {new Date().getFullYear()} ZenFocus. All rights reserved.
      </footer>
    </main>
  );
}

