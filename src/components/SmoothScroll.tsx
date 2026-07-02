"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/** Global buttery smooth-scroll (wheel + anchor links). Disabled when the user prefers reduced motion. */
export default function SmoothScroll() {
    const reduced = useReducedMotion();

    useEffect(() => {
        if (reduced) return;

        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            anchors: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        let raf = 0;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, [reduced]);

    return null;
}
