"use client";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

// Client-only 3D particle field (needs WebGL — never SSR it).
const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

/** Fixed, site-wide animated backdrop: dark base + neon particle field + slow drifting glows.
 *  Sits behind all page content (which is ~80% opaque, so this shows through subtly). */
export default function SiteBackground() {
    const reduced = useReducedMotion();
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[#070709]" />
            <div className="absolute inset-0 opacity-60">
                <ThreeBackground />
            </div>
            {!reduced && (
                <>
                    <motion.div
                        className="absolute top-[8%] left-[12%] h-[50vh] w-[50vh] rounded-full bg-primary/10 blur-[140px]"
                        animate={{ x: [0, 70, 0], y: [0, 40, 0], opacity: [0.35, 0.65, 0.35] }}
                        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-[10%] right-[10%] h-[45vh] w-[45vh] rounded-full bg-primary/10 blur-[140px]"
                        animate={{ x: [0, -60, 0], y: [0, -35, 0], opacity: [0.25, 0.55, 0.25] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}
        </div>
    );
}
