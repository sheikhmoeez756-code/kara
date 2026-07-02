"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Stats() {
    return (
        <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden" id="models">
            <div className="absolute left-0 bottom-0 w-1/3 h-[500px] bg-primary/10 blur-[200px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 relative"
                >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass p-2">
                        <div className="absolute inset-0 bg-primary/10 animate-pulse mix-blend-overlay"></div>
                        {/* Using the same car image, but object-cover zooms in well enough for a detail shot */}
                        <Image src="/car-detail.jpg" alt="Car detail" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover rounded-[20px] filter brightness-75 contrast-125 hover:scale-105 transition-all duration-700" style={{ objectPosition: 'center' }} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute -bottom-6 -right-2 md:-right-6 glass px-6 py-4 rounded-xl flex items-center gap-4 border border-primary/20 backdrop-blur-xl shrink-0"
                    >
                        <span className="w-3 h-3 rounded-full bg-primary glow-pulse relative">
                            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75"></span>
                        </span>
                        <span className="font-outfit font-bold tracking-widest text-xs md:text-sm whitespace-nowrap">NEXT-GEN ENGINEERING</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 space-y-10"
                >
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Performance</span>
                        <h2 className="text-4xl lg:text-5xl font-outfit font-black mb-6 leading-tight">THE FUTURE OF<br />SPORT CARS IS HERE</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Pioneering a new era of high-performance driving. Power meets precision in a breathtaking display of aerodynamic engineering.
                        </p>
                    </div>

                    <div className="space-y-8 glass p-8 rounded-3xl">
                        {[
                            { label: "Top Speed", value: "350+ km/h", target: "95%" },
                            { label: "0-100 km/h", value: "1.9s", target: "98%" },
                            { label: "Aerodynamic Drag", value: "0.20 Cd", target: "85%" }
                        ].map((stat, i) => (
                            <div key={stat.label}>
                                <div className="flex justify-between mb-3">
                                    <span className="font-bold font-outfit">{stat.label}</span>
                                    <span className="text-primary font-black font-outfit">{stat.value}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: stat.target }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (i * 0.2) }}
                                        className="h-full bg-primary shadow-glow relative"
                                    >
                                        <div className="absolute top-0 right-0 w-4 h-full bg-white/50 blur-[2px]"></div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
