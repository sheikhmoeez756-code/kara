"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CarsTab() {
    const [activeTab, setActiveTab] = useState(0);
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        setImgLoaded(false);
    }, [activeTab]);

    const tabs = ["FORD", "PORSCHE", "AUDI"];

    const cars = [
        { name: "FORD GT", price: "$ 100.000", image: "/ford-rare.png", desc: "A very cool car and has great speed and acceleration, you can buy it with the current promo. don't miss it." },
        { name: "PORSCHE 911", price: "$ 180.000", image: "/hero-hood.png", desc: "Timeless design meets relentless performance. The pinnacle of precision engineering and driving pleasure." },
        { name: "AUDI R8", price: "$ 150.000", image: "/ford-rare.png", desc: "Uncompromising dynamic performance and unmistakable design. The supercar for everyday use." },
    ];

    return (
        <section className="py-24 md:py-32 bg-[#090909] relative border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 z-10 relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-sans font-bold uppercase max-w-lg tracking-tight leading-[1.1]"
                    >
                        Pick the best rare cars for you
                    </motion.h2>

                    <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-gray-400 text-sm max-w-xs"
                        >
                            Many choices of good and very rare cars here, you can get them easily cheap with us
                        </motion.p>
                        <motion.a
                            href="#"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors group"
                        >
                            Explore
                            <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-lg">↗</span>
                        </motion.a>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-8 md:gap-16 border-b border-white/10 mb-12">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className={`pb-4 px-4 text-sm font-bold tracking-widest transition-all relative outline-none ${activeTab === i ? "text-primary scale-105" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {tab}
                            {activeTab === i && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-[-1px] left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(230,255,0,0.6)]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                            className="flex flex-col lg:flex-row items-center relative z-10"
                        >
                            <div className="w-full lg:w-3/5 h-[50vh] lg:h-[70vh] relative overflow-hidden group">
                                {!imgLoaded && (
                                    <div
                                        className="absolute inset-0 z-[5] animate-pulse bg-gradient-to-br from-zinc-800/90 to-zinc-950"
                                        aria-hidden
                                    />
                                )}
                                <Image
                                    src={cars[activeTab].image}
                                    alt={cars[activeTab].name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    onLoad={() => setImgLoaded(true)}
                                    className={`object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 ${imgLoaded ? "opacity-80" : "opacity-0"}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f0f0f] to-transparent opacity-80 lg:w-1/2"></div>
                            </div>

                            <div className="w-full lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center bg-gradient-to-l from-transparent to-[#0f0f0f]">
                                <p className="text-gray-300 text-sm leading-relaxed mb-10 w-full">
                                    {cars[activeTab].desc}
                                </p>

                                <div className="flex items-center gap-4 mb-16 group cursor-pointer">
                                    <span className="text-primary text-3xl font-sans font-bold">$</span>
                                    <div className="text-5xl md:text-6xl font-sans font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
                                        {cars[activeTab].price.split("$ ")[1]}
                                    </div>
                                    <span className="text-sm text-gray-600 line-through self-end mb-2">$ 150.000</span>
                                </div>

                                <div className="flex flex-wrap gap-4 w-full">
                                    <button className="flex-1 min-w-[200px] bg-primary text-black font-bold uppercase tracking-widest text-xs px-8 py-5 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
                                        Buy Now
                                    </button>
                                    <button className="flex-1 min-w-[150px] bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs px-8 py-5 hover:border-white transition-colors">
                                        Detail
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
