"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    { q: "How do I purchase a rare car from your inventory?", a: "To purchase, you must apply for exclusive access or contact our designated sales representative. We handle all logistics and verification internally." },
    { q: "Do you offer international shipping?", a: "Yes, we ship globally via authorized secure freight. Your vehicle is insured throughout the transition process directly to your doorstep." },
    { q: "What is your service and repair capability?", a: "Our mechanics specialize in high-end luxury constraints, from classic Porsches to modern hypercars, using exclusively original manufactured parts." },
    { q: "Can I sell my luxury vehicle to Kara?", a: "We actively evaluate rare luxury items for procurement. Submit your vehicle details in the member application panel for an immediate assessment." }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-[#090909] border-t border-white/5 relative overflow-hidden">
            <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none rounded-full"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto">Everything you need to know about our luxury inventory, procurement process, and exclusive repair services.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-white/5 rounded-2xl bg-[#0f0f0f] overflow-hidden group hover:border-primary/30 transition-all duration-300 shadow-lg"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                            >
                                <span className={`font-sans font-bold uppercase tracking-wide text-sm md:text-base transition-colors duration-300 pr-8 ${openIndex === i ? 'text-primary' : 'text-white'}`}>
                                    {faq.q}
                                </span>
                                <span className={`text-2xl transition-transform duration-500 ease-in-out ${openIndex === i ? 'rotate-[135deg] text-primary' : 'text-gray-500 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`}>
                                    +
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
