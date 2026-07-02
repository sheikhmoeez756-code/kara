/** Central brand/site config — single source of truth so the name stays consistent. */
export const SITE = {
  name: "Kara",
  fullName: "Kara Motors",
  tagline: "Next-Gen Luxury Cars",
  description:
    "Buy, configure, and repair your luxury car with Kara — a cinematic, next-generation automotive experience.",
  /** Production URL — used for SEO/OG. Override with NEXT_PUBLIC_SITE_URL in the environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kara-pi.vercel.app",
} as const;
