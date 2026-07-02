"use client";
import { motion } from "framer-motion";
import { BadgeCheck, FileText, RotateCcw, ShieldCheck } from "lucide-react";

const pillars = [
    { icon: BadgeCheck, title: "200-Point Inspection", text: "Every car is mechanically and cosmetically inspected by certified technicians before it's listed." },
    { icon: FileText, title: "Full History Report", text: "Verified ownership, service, and accident history included with every vehicle — no surprises." },
    { icon: RotateCcw, title: "7-Day Money Back", text: "Not in love? Return it within 7 days for a full refund. Buying online should be risk-free." },
    { icon: ShieldCheck, title: "12-Month Warranty", text: "Comprehensive cover on every certified car, backed by our nationwide service network." },
];

export default function Trust() {
    return (
        <section id="trust" className="py-24 md:py-32 bg-[#050505]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute left-0 top-1/3 w-[500px] h-[400px] bg-primary/5 blur-[160px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Buy With Confidence</span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">Certified. Guaranteed.</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Buying a rare car online should feel safer than buying in person — so we built the guarantees to prove it.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="rounded-3xl p-7 border border-white/5 bg-white/[0.02] hover:border-primary/40 transition-all duration-300 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                                <p.icon size={26} />
                            </div>
                            <h3 className="font-bold mb-2">{p.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{p.text}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center glass rounded-2xl px-8 py-6 max-w-3xl mx-auto"
                >
                    <ShieldCheck className="text-primary shrink-0" size={34} />
                    <p className="text-sm text-gray-300">
                        <span className="font-bold text-white">Secure, encrypted payments.</span> Your deposit is fully refundable and protected end-to-end — reserve with total peace of mind.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
