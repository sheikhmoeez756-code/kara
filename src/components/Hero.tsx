"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { sounds } from "@/utils/sounds";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const reduce = !!reduceMotion;
    const bgOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [0.25, 0.25] : [0.25, 0.08]);
    const hoodY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 56]);
    const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 28]);

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        }),
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex flex-col md:flex-row bg-[#090909] overflow-hidden"
        >
            {/* Self-contained cinematic background: local image + animated glow (no external deps) */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
                    <Image
                        src="/hero-car.png"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover grayscale"
                    />
                </motion.div>
                {!reduce && (
                    <motion.div
                        className="absolute -top-1/3 left-1/4 h-[60vh] w-[60vh] rounded-full bg-primary/10 blur-[120px]"
                        animate={{ opacity: [0.4, 0.75, 0.4] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-transparent to-[#090909]"></div>
            </div>

            <motion.div
                style={{ y: copyY }}
                className="w-full md:w-1/2 flex flex-col justify-center px-6 md:pl-24 pr-12 pt-32 md:pt-0 z-20"
            >
                <motion.h1
                    className="text-5xl md:text-5xl lg:text-[4.5rem] font-sans font-bold leading-[1.1] tracking-tight mb-8"
                >
                    {["BUY AND REPAIR", "YOUR LUXURY CAR HERE"].map((line, i) => (
                        <div key={line} className="overflow-hidden">
                            <motion.div custom={i} initial="hidden" animate="visible" variants={textVariants}>
                                {line}
                            </motion.div>
                        </div>
                    ))}
                </motion.h1>

                <motion.p
                    custom={2} initial="hidden" animate="visible" variants={textVariants}
                    className="text-gray-400 text-sm md:text-base max-w-md mb-12 leading-relaxed"
                >
                    buy a car without going to the dealer, repair the car, we pick you up, you can sit in peace
                </motion.p>

                <motion.div
                    custom={3} initial="hidden" animate="visible" variants={textVariants}
                    className="flex flex-wrap items-center gap-6"
                >
                    <button
                        onMouseEnter={() => sounds.playHover()}
                        onClick={() => sounds.playClick()}
                        className="bg-primary text-black font-bold uppercase tracking-widest text-xs px-10 py-4 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(230,255,0,0.3)]"
                    >
                        Explore
                    </button>
                    <button
                        onMouseEnter={() => sounds.playHover()}
                        onClick={() => sounds.playClick()}
                        className="bg-transparent border border-gray-600 text-white font-bold uppercase tracking-widest text-xs px-10 py-4 hover:border-white transition-colors"
                    >
                        Repair
                    </button>
                </motion.div>
            </motion.div>

            <motion.div
                style={{ y: hoodY }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-0 w-full md:w-[60%] h-[50vh] md:h-screen z-10 hidden md:block"
            >
                <Image
                    src="/hero-hood.png"
                    alt="Luxury car hood"
                    fill
                    priority
                    sizes="60vw"
                    className="object-cover object-left"
                />
                {/* Gradient shadow for blending */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#090909] to-transparent"></div>
            </motion.div>
        </section>
    );
}
