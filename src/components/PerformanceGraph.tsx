"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

export default function PerformanceGraph() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2.5, ease: "easeInOut", delay: 0.3 }
        }
    };

    return (
        <section id="models" className="py-24 bg-[#090909]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight max-w-sm"
                    >
                        Performance Metrics
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-sm max-w-xs text-left md:text-right"
                    >
                        Unmatched acceleration and top speed tracked across all rare and exotic vehicles in our catalog.
                    </motion.p>
                </div>

                <div
                    ref={ref}
                    className="w-full h-[400px] bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 relative shadow-2xl overflow-hidden group hover:border-primary/20 transition-colors"
                >
                    {/* Grid lines */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-[0.05]">
                        {[...Array(6)].map((_, i) => <div key={i} className="w-full h-px bg-white"></div>)}
                    </div>

                    {/* SVG Graph */}
                    <div className="absolute inset-0 p-8 pb-12 pt-16">
                        <svg viewBox="0 0 1000 300" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
                            {/* Fill Gradient beneath line */}
                            <defs>
                                <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#E6FF00" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#E6FF00" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 1.5, delay: 1 }}
                                d="M 0,300 L 0,250 C 200,200 300,80 500,100 C 700,150 800,40 1000,0 L 1000,300 Z"
                                fill="url(#neonGradient)"
                            />
                            <motion.path
                                variants={pathVariants}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                d="M 0,250 C 200,200 300,80 500,100 C 700,150 800,40 1000,0"
                                fill="none"
                                stroke="#E6FF00"
                                strokeWidth="4"
                                className="drop-shadow-[0_0_15px_rgba(230,255,0,0.8)]"
                            />

                            {/* Data points */}
                            {inView && [
                                { cx: "250", cy: "205", label: "0-60 MPH" },
                                { cx: "500", cy: "100", label: "Horsepower" },
                                { cx: "800", cy: "68", label: "Top Speed" }
                            ].map((pt, i) => (
                                <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 + (i * 0.3) }}>
                                    <motion.circle
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.5 + (i * 0.3), type: "spring" }}
                                        cx={pt.cx}
                                        cy={pt.cy}
                                        r="7"
                                        fill="#0f0f0f"
                                        stroke="#E6FF00"
                                        strokeWidth="3"
                                        className="drop-shadow-[0_0_12px_rgba(230,255,0,1)]"
                                    />
                                    <text x={pt.cx} y={Number(pt.cy) - 20} fill="#f5f5f5" fontSize="12" textAnchor="middle" className="font-sans font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        {pt.label}
                                    </text>
                                </motion.g>
                            ))}
                        </svg>
                    </div>

                    <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        <span>2023 Model Year</span>
                        <span>2024 Model Year</span>
                        <span>2025 Model Year</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
