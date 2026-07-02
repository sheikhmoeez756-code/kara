"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, MessageSquare } from "lucide-react";

const coverage = ["Lahore", "Karachi", "Islamabad", "Dubai", "Abu Dhabi", "Doha", "Riyadh", "London"];

const details = [
    { icon: MapPin, label: "Flagship", value: "Kara Motors, Block E, Johar Town, Lahore" },
    { icon: Mail, label: "Email", value: "concierge@kara.com" },
    { icon: Phone, label: "Phone", value: "+92 333 9560199" },
    { icon: Clock, label: "Hours", value: "Mon–Sun · 9:00 – 21:00" },
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32 bg-[#050505]/80 relative border-t border-white/5 overflow-hidden">
            <div className="absolute right-1/4 top-0 w-[500px] h-[300px] bg-primary/5 blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-14">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Get in Touch</span>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight mb-6 leading-tight">Talk to a<br />Concierge</h2>
                    <p className="text-gray-400 leading-relaxed mb-10 max-w-md">
                        Every client gets a dedicated advisor. Reach us any day of the week — we&apos;ll handle the rest.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        {details.map((d) => (
                            <div key={d.label} className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <d.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{d.label}</p>
                                    <p className="text-sm text-gray-200">{d.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="mailto:concierge@kara.com" className="inline-flex items-center gap-2 bg-primary text-black font-bold uppercase tracking-widest text-xs px-7 py-4 rounded-xl hover:bg-white transition-all">
                        <MessageSquare size={16} /> Message the Concierge
                    </a>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-primary" />
                        <h3 className="text-lg font-bold uppercase tracking-wide">Delivery Coverage</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-8">We deliver — and collect for service — across these hubs and everywhere in between.</p>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {coverage.map((city) => (
                            <span key={city} className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-200">{city}</span>
                        ))}
                        <span className="px-4 py-2 rounded-full text-xs font-semibold bg-primary/10 border border-primary/30 text-primary">+ 40 more</span>
                    </div>
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-[#0c0c10] border border-white/5">
                        <div className="absolute inset-0 bg-grid opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="relative">
                                <span className="w-4 h-4 rounded-full bg-primary block shadow-[0_0_20px_rgba(230,255,0,0.7)]"></span>
                                <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping"></span>
                            </span>
                        </div>
                        <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-gray-500">Nationwide door-to-door</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
