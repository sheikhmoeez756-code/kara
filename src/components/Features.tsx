"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function Counter({ from, to }: { from: number, to: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(from);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (inView) {
            animate(count, to, { duration: 2, ease: "easeOut" });
        }
    }, [inView, count, to]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Features() {
    const stats = [
        { num: "+100", value: 100, label: "Rare and elegant car ready to be delivered", icon: "✨" },
        { num: "+200", value: 200, label: "Rare and elegant equipment, ready to be equipped", icon: "⚙️" },
        { num: "+444", value: 444, label: "Customers are very satisfied with our service", icon: "⭐" },
    ];

    return (
        <section className="py-32 bg-[#090909]/80 relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">

                    {/* Left Text */}
                    <div className="lg:w-1/2 lg:sticky top-32">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl font-sans font-bold uppercase tracking-tight mb-8"
                        >
                            Why Always Us ?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 leading-relaxed max-w-sm mb-12 text-sm md:text-base"
                        >
                            we provide service that is very satisfying to customers. has many products and needs that you need from ordinary items to rare items.
                        </motion.p>
                        <motion.a
                            href="#reviews"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors group"
                        >
                            About Us
                            <span className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-lg">↗</span>
                        </motion.a>
                    </div>

                    {/* Right Cards */}
                    <div className="lg:w-1/2 flex flex-col gap-6 w-full">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.num}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                whileHover={{ scale: 1.02, x: -10 }}
                                className="bg-[#0f0f0f] border border-white/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 group hover:border-primary/50 transition-all duration-300 relative overflow-hidden rounded-[2rem] hover:shadow-[0_0_30px_rgba(230,255,0,0.15)]"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <h3 className="text-5xl md:text-6xl font-sans font-bold text-white group-hover:text-primary transition-all duration-300 min-w-[150px] flex items-center">
                                    +<Counter from={0} to={stat.value} />
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{stat.label}</p>
                                <div className="ml-auto text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(230,255,0,0.5)]">
                                    {stat.icon}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
