import type { MetadataRoute } from "next";
import { cars } from "@/lib/cars";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = SITE.url;
    const staticPaths = ["", "/inventory", "/garage", "/login", "/configure", "/privacy", "/terms"];
    const staticRoutes = staticPaths.map((p) => ({
        url: `${base}${p}`,
        changeFrequency: "weekly" as const,
        priority: p === "" ? 1 : 0.6,
    }));
    const carRoutes = cars.map((c) => ({
        url: `${base}/inventory/${c.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));
    return [...staticRoutes, ...carRoutes];
}
