export const PRODUCTS = {
  "tallow-cream": {
    id: "tallow-cream",
    name: "PureGlow Tallow Cream — Lemongrass & Lavender",
    price: 2800, // unit_amount in cents ($28.00)
    displayPrice: "$28.00",
    badge: "Small-Batch · Grass-Fed · Limited Stock",
    heroHeadline: "Your Skin's Missing Match.",
    heroHighlight: "Missing Match.",
    heroDescription:
      "Grass-fed tallow is molecularly similar to your skin's natural oils — delivering deep, 24-hour hydration that synthetic lotions simply can't replicate. Meet PureGlow Tallow Cream, Lemongrass & Lavender.",
    heroImage: {
      src: "/pureglow-tallow-cream.png",
      alt: "PureGlow Tallow Cream — Lemongrass & Lavender",
    },
    checkoutDescription:
      "Small-batch, grass-fed tallow cream with lemongrass & lavender. Deep 24-hour hydration with vitamins A, D, E & K. Zero synthetics.",
    checkoutImage:
      "https://placehold.co/600x400/FDFCF0/8A9A5B?text=PureGlow",
    benefitsSectionTitle: "Why PureGlow?",
    benefitsSectionSubtitle:
      "Three reasons your skin will never go back to conventional lotion.",
    benefits: [
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
    ],
    comparisonTitle: "Tallow vs. Water-Based Lotions",
    comparisonSubtitle:
      "Not all moisturizers are created equal. See what your skin is actually getting.",
    comparisonMetrics: [
      {
        dimension: "Ingredients",
        tallow: "Grass-fed tallow, lemongrass & lavender — zero synthetics",
        waterBased: "Water, emulsifiers, preservatives & synthetic fragrance",
      },
      {
        dimension: "Hydration",
        tallow: "Deep 24-hour hydration from biocompatible lipids",
        waterBased: "Evaporates quickly — moisture lasts only hours",
      },
      {
        dimension: "Skin Compatibility",
        tallow: "Molecularly biocompatible with your skin's natural oils",
        waterBased: "Chemicals can disrupt the skin barrier over time",
      },
      {
        dimension: "Vitamins",
        tallow: "Naturally rich in vitamins A, D, E & K",
        waterBased: "Synthetic additives, poorly absorbed by skin",
      },
      {
        dimension: "Fillers",
        tallow: "Zero fillers — every ingredient earns its place",
        waterBased: "Up to 70% water plus cheap filler ingredients",
      },
    ],
    safetyUsage: {
      patchTestWarning:
        "Always patch test before full application: apply a small amount to your inner arm for 24 hours to check for sensitivity.",
      howToUse: [
        "Start with clean, dry skin.",
        "Apply a small amount to face or body, gently massaging until absorbed.",
        "Repeat daily, morning or evening, as desired.",
      ],
    },
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;
