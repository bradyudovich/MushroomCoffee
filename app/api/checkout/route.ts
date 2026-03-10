import { NextResponse } from "next/server";
import Stripe from "stripe";

// Lazy singleton: avoids build-time errors when STRIPE_SECRET_KEY is absent
let _stripe: Stripe | null = null;
function getStripe(): Stripe | null {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  _stripe = new Stripe(key);
  return _stripe;
}

export async function POST() {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe secret key is not configured" },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "PureGlow Tallow Cream — Lemongrass & Lavender",
              description:
                "Small-batch, grass-fed tallow cream with lemongrass & lavender. Deep 24-hour hydration with vitamins A, D, E & K. Zero synthetics.",
              images: [
                "https://placehold.co/600x400/FDFCF0/8A9A5B?text=PureGlow",
              ],
            },
            unit_amount: 2800,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


