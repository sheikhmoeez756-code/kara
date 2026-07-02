"use client";
import { motion } from "framer-motion";
import { Search, Settings2, Truck, ShieldCheck } from "lucide-react";

const steps = [
    { icon: Search, title: "Browse", text: "Explore a curated collection of rare and luxury cars — every spec, detail, and price transparent and online." },
    { icon: Settings2, title: "Reserve", text: "Configure your car and reserve it in minutes. Fixed, fair pricing — no haggling, no pressure, no waiting rooms." },
    { icon: Truck, title: "We Deliver", text: "Your car arrives at your door, fully inspected and detailed. The dealership comes to you — not the other way around." },
    { icon: ShieldCheck, title: "We Care", text: "Servicing with complimentary pickup & return, and instant valuations whenever you're ready to sell or trade in." },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32 bg-[#090909]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[350px] bg-primary/5 blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">The Idea</span>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight leading-tight mb-6">
                            A Dealership<br />Without the Dealership
                        </h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
                        <p className="text-gray-300 leading-relaxed">
                            Kara reimagines luxury car ownership as a fully digital, concierge experience. Buy a rare car without ever setting foot in a showroom, have it delivered to your door, and never worry about maintenance again — we collect, service, and return it detailed.
                        </p>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            No pushy salespeople. No waiting rooms. No haggling. Just an effortless, transparent way to buy, own, service, and sell the world&apos;s finest machines — all from wherever you are.
                        </p>
                    </motion.div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            className="relative rounded-3xl p-7 border border-white/5 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-300 group"
                        >
                            <span className="absolute top-6 right-7 text-5xl font-black text-white/5 group-hover:text-primary/20 transition-colors">
                                {i + 1}
                            </span>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-black transition-all">
                                <step.icon size={22} />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.text}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-400 max-w-3xl mx-auto mt-16 text-lg leading-relaxed"
                >
                    Our mission is simple: make owning an extraordinary car <span className="text-primary font-semibold">as effortless as the drive itself.</span>
                </motion.p>
            </div>
        </section>
    );
}
