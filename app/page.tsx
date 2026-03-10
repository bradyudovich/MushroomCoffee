"use client";

import Image from "next/image";
import { useState } from "react";
import Comparison from "@/components/Comparison";
import { PRODUCTS } from "@/config/products";

const product = PRODUCTS["tallow-cream"];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
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
          {product.badge}
        </span>

        <h1 className="mb-6 max-w-3xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl text-stone-900">
          Your Skin&apos;s{" "}
          <span className="text-[#8A9A5B]">{product.heroHighlight}</span>
        </h1>

        <p className="mb-10 max-w-xl text-lg text-stone-600 md:text-xl">
          {product.heroDescription}
        </p>

        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="mb-4 rounded-full bg-[#8A9A5B] px-10 py-4 text-lg font-semibold text-[#FDFCF0] shadow-lg shadow-[#8A9A5B]/30 transition-all hover:bg-[#7a8a4e] hover:shadow-[#8A9A5B]/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Redirecting…" : `Buy Now — ${product.displayPrice}`}
        </button>

        {error && <p className="mb-6 text-sm text-red-500">{error}</p>}

        <div className="mt-10 relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 shadow-2xl shadow-[#8A9A5B]/10">
          <Image
            src={product.heroImage.src}
            alt={product.heroImage.alt}
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
            {product.benefitsSectionTitle}
          </h2>
          <p className="mb-14 text-center text-stone-500 max-w-xl mx-auto">
            {product.benefitsSectionSubtitle}
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {product.benefits.map((benefit) => (
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
            {product.comparisonTitle}
          </h2>
          <p className="mb-14 text-center text-stone-500 max-w-xl mx-auto">
            {product.comparisonSubtitle}
          </p>
          <Comparison rows={product.comparisonMetrics} />

          <div className="mt-12 text-center">
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="rounded-full bg-[#8A9A5B] px-10 py-4 text-lg font-semibold text-[#FDFCF0] shadow-lg shadow-[#8A9A5B]/30 transition-all hover:bg-[#7a8a4e] hover:shadow-[#8A9A5B]/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting…" : `Get PureGlow — ${product.displayPrice}`}
            </button>
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </section>

      {/* Safety & Usage Section */}
      <section className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Safety &amp; Usage
          </h2>

          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
            <p className="text-sm leading-relaxed text-amber-800">
              <strong>⚠ Patch Test Warning:</strong>{" "}
              {product.safetyUsage.patchTestWarning}
            </p>
          </div>

          <h3 className="mb-6 font-serif text-xl font-semibold text-stone-900">
            How to Use
          </h3>
          <ol className="space-y-4">
            {product.safetyUsage.howToUse.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8A9A5B] text-sm font-bold text-[#FDFCF0]">
                  {idx + 1}
                </span>
                <p className="pt-1 text-stone-600">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-400">
        © {new Date().getFullYear()} PureGlow. All rights reserved.
      </footer>
    </main>
  );
}

