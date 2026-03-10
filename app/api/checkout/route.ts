import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS, ProductId } from "../../../config/products";

// Lazy singleton: avoids build-time errors when STRIPE_SECRET_KEY is absent
let _stripe: Stripe | null = null;
function getStripe(): Stripe | null {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  _stripe = new Stripe(key);
  return _stripe;
}

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe secret key is not configured" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const productId = body.productId as ProductId | undefined;
  const product = productId ? PRODUCTS[productId] : undefined;

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.checkoutDescription,
              images: [product.checkoutImage],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/success?productId=${productId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

