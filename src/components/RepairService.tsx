"use client";
import { motion } from "framer-motion";
import { Wrench, Gauge, ShieldCheck, Truck } from "lucide-react";

const tiers = [
    {
        icon: Wrench,
        name: "Essential Care",
        price: "from $299",
        desc: "Routine maintenance to keep your machine running flawlessly.",
        features: ["Full diagnostic scan", "Oil & fluid service", "Brake inspection", "Tyre & alignment check"],
        featured: false,
    },
    {
        icon: Gauge,
        name: "Performance",
        price: "from $899",
        desc: "Precision tuning and detailing for peak performance.",
        features: ["Everything in Essential", "ECU / performance tuning", "Suspension calibration", "Ceramic detail & polish"],
        featured: true,
    },
    {
        icon: ShieldCheck,
        name: "Concierge",
        price: "from $1,900",
        desc: "White-glove restoration and bespoke care for rare vehicles.",
        features: ["Everything in Performance", "OEM-only parts sourcing", "Bodywork & paint correction", "Dedicated service advisor"],
        featured: false,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function RepairService() {
    return (
        <section id="repair" className="py-24 md:py-32 bg-[#050505]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary/5 blur-[160px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Service & Repair</span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">Care Worthy of the Machine</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Factory-trained specialists, original parts, and complimentary pickup & delivery — so you never miss a beat.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            className={`relative rounded-3xl p-8 border transition-all duration-300 ${tier.featured ? 'border-primary/50 bg-primary/[0.04]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
                        >
                            {tier.featured && (
                                <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest text-black bg-primary px-3 py-1 rounded-full">Popular</span>
                            )}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.featured ? 'bg-primary text-black' : 'bg-primary/10 text-primary'}`}>
                                <tier.icon size={26} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                            <p className="text-primary font-bold text-sm mb-4">{tier.price}</p>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">{tier.desc}</p>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="text-primary mt-0.5">✓</span> {f}
                                    </li>
                                ))}
                            </ul>
                            <a href="#booking" className={`block text-center text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all ${tier.featured ? 'bg-primary text-black hover:bg-white' : 'border border-white/10 hover:border-white'}`}>
                                Book Service
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-4 text-center glass rounded-2xl px-6 py-5 max-w-2xl mx-auto"
                >
                    <Truck className="text-primary shrink-0" size={26} />
                    <p className="text-sm text-gray-300">
                        <span className="font-bold text-white">Free pickup &amp; delivery</span> within the city — we collect your car, service it, and return it detailed.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
