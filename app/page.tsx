"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Comparison from "@/components/Comparison";
import { PRODUCTS } from "@/config/products";

const product = PRODUCTS["tallow-cream"];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "The lemongrass scent is absolutely divine — light, fresh, and lingers just enough. My skin feels softer than it has in years.",
  },
  {
    id: 2,
    name: "Jessica T.",
    rating: 5,
    text: "I was skeptical about tallow at first, but the lemongrass & lavender combo completely won me over. Smells incredible and absorbs beautifully.",
  },
  {
    id: 3,
    name: "Amanda R.",
    rating: 5,
    text: "That lemongrass scent is so clean and uplifting. It turns my morning routine into a little spa moment. Absolutely obsessed.",
  },
  {
    id: 4,
    name: "Lauren K.",
    rating: 5,
    text: "I've tried every luxury moisturizer out there. Nothing comes close to how this lemongrass version makes my skin feel — and the scent lasts all day.",
  },
  {
    id: 5,
    name: "Priya N.",
    rating: 5,
    text: "The lemongrass is subtle but unmistakable. Not overpowering at all — just a gentle, grounding fragrance that pairs perfectly with the lavender.",
  },
  {
    id: 6,
    name: "Claire B.",
    rating: 5,
    text: "I gifted this to my mom and she called me the next day raving about the lemongrass scent. We're both hooked. Zero synthetics, all results.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#8A9A5B] text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const STICKY_HEADER_SCROLL_THRESHOLD = 0.8;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = heroRef.current;
      if (!heroEl) return;
      setStickyVisible(window.scrollY > heroEl.offsetHeight * STICKY_HEADER_SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#FDFCF0]/95 backdrop-blur-sm border-b border-stone-200 shadow-sm transition-all duration-300 ${
          stickyVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-3">
          <div>
            <p className="font-serif font-semibold text-stone-900 text-sm leading-tight">
              {product.name}
            </p>
            <p className="text-[#8A9A5B] font-bold text-sm">
              {product.displayPrice}
            </p>
          </div>
          <button
            onClick={handleBuyNow}
            disabled={loading}
            className="rounded-full bg-[#8A9A5B] px-5 py-2 text-sm font-semibold text-[#FDFCF0] shadow-md shadow-[#8A9A5B]/30 transition-all hover:bg-[#7a8a4e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Buy Now"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center overflow-hidden">
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
            {product.benefits.map((benefit, idx) => (
              <AnimatedBenefitCard key={benefit.title} benefit={benefit} delay={idx * 100} />
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

      {/* Social Proof Reviews Section */}
      <section className="px-6 py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[#8A9A5B]">
            Verified Buyers
          </p>
          <h2 className="mb-4 text-center font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Real People. Real Results.
          </h2>
          <p className="mb-14 text-center text-stone-500 max-w-xl mx-auto">
            Thousands of customers have made PureGlow their daily ritual — here&apos;s what they&apos;re saying.
          </p>
          {/* Marquee row 1 */}
          <div className="relative">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...REVIEWS, ...REVIEWS].map((review, i) => (
                <div
                  key={i}
                  className="inline-flex flex-col justify-between w-72 shrink-0 rounded-2xl border border-stone-200 bg-[#FDFCF0] p-6 whitespace-normal"
                >
                  <div>
                    <StarRating count={review.rating} />
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8A9A5B]/10 text-xs font-bold text-[#8A9A5B]">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-800">
                        {review.name}
                      </p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

function AnimatedBenefitCard({
  benefit,
  delay,
}: {
  benefit: { icon: string; title: string; description: string };
  delay: number;
}) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl border border-stone-200 bg-[#FDFCF0] p-8 transition-all duration-700 hover:border-[#8A9A5B]/50 hover:shadow-md ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mb-4 text-4xl">{benefit.icon}</div>
      <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
        {benefit.title}
      </h3>
      <p className="text-sm leading-relaxed text-stone-500">
        {benefit.description}
      </p>
    </div>
  );
}

