import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF0] text-stone-800 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-6xl">🌿</div>
      <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
        Order Confirmed!
      </h1>
      <p className="mb-8 max-w-md text-lg text-stone-500">
        Thank you for your PureGlow Tallow Cream order. Your skin&apos;s new
        ritual is on its way — check your email for order details.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#8A9A5B] px-8 py-3 font-semibold text-[#FDFCF0] transition-all hover:bg-[#7a8a4e]"
      >
        Back to Home
      </Link>
    </main>
  );
}

