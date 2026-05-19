"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = ['A', 'BUTTON', 'INPUT'].includes(target.tagName) ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button';

            if (isInteractive) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver);

        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                width: isHovering ? 50 : 12,
                height: isHovering ? 50 : 12,
                backgroundColor: isHovering ? "rgba(230,255,0,0.15)" : "#E6FF00",
                border: isHovering ? "1px solid rgba(230,255,0,0.5)" : "none",
                boxShadow: isHovering ? "0 0 30px rgba(230,255,0,0.4)" : "0 0 15px rgba(230,255,0,0.8)",
                left: -6,
                top: -6,
                marginLeft: isHovering ? -19 : 0,
                marginTop: isHovering ? -19 : 0,
            }}
            transition={{
                width: { type: "spring", stiffness: 400, damping: 30 },
                height: { type: "spring", stiffness: 400, damping: 30 },
                backgroundColor: { duration: 0.2 },
                border: { duration: 0.2 }
            }}
        />
    );
}
