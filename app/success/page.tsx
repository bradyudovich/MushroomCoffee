import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-6xl">🎉</div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
        Order Confirmed!
      </h1>
      <p className="mb-8 max-w-md text-lg text-neutral-400">
        Thank you for ordering ZenFocus Mushroom Coffee. Your journey to
        sharper focus and cleaner energy starts now. Check your email for
        order details.
      </p>
      <Link
        href="/"
        className="rounded-full bg-emerald-500 px-8 py-3 font-semibold text-neutral-950 transition-all hover:bg-emerald-400"
      >
        Back to Home
      </Link>
    </main>
  );
}

